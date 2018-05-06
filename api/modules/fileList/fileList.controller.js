const request = require('request');
const FileListService = require('../../services/FileListService');
const UrlEncodeService = require('../../services/UrlEncodeService');
const CryptoService = require('../../services/CryptoService');
const RedisService = require('../../services/RedisService');
const config = require('../../config/env'); //replace this

module.exports = {
  async getAll(req, res, next) {

    const redisService = new RedisService();

    const userId = getUserId(); //authenticated user
    const urlEncodingSecret = CryptoService.getRandomHash();

    /**
     * Set temporary personal (for each user) encryption secret (expires) 
     */
    redisService.set(userId, urlEncodingSecret);

    const fileList = await FileListService.getFiles();
    const urlEncodeService = new UrlEncodeService(urlEncodingSecret);

    /**
     * Encode all the internal hash/salt
     */
    const hashedLinks = fileList.map((singleFile) => {
      return {
        originalStream: `${getMediaProxyServerUrl()}/${urlEncodeService.encode(singleFile)}`,
        encryptedStream: `${getMediaProxyServerUrl()}/${urlEncodeService.encode(singleFile)}/?option=encrypted`,
      }
    });

    res.send({ success: true, data: hashedLinks });
  },

  async getOne(req, res, next) {
    const redisService = new RedisService();

    const userId = getUserId(); //authenticated user
    const { urlEncoded } = req.params;
    const urlEncodeSecret = await redisService.get(userId);
    const urlEncodeService = new UrlEncodeService(urlEncodeSecret);
    const urlDecoded = urlEncodeService.decode(urlEncoded);

    /**
     * Validate url (expiration date)
     */
    const currentDate = new Date();
    const expirationDate = new Date(urlDecoded.expires);

    if (currentDate >= expirationDate) {
      return res.send({ success: false, data: null });
    }
    return res.send({ success: true, data: urlDecoded });
  },
};


const getUserId = () => {
  return '12345';
};

const getMediaProxyServerUrl = () => {
  return config.SERVER_MEDIA_PROXY_URL;
};

