const requestPromise = require('request-promise-native');
const request = require('request');
const config = require('../../config/env');
const crypto = require('crypto');
const zlib = require('zlib');

module.exports = {
  async getFile(req, res, next) {
    const API_URL = config.SERVER_API_URL;
    const { urlEncrypted } = req.params;

    const result = await requestPromise.get(`${API_URL}/media/files/${urlEncrypted}`);
    const mediaResponse = JSON.parse(result);

    if (!mediaResponse.success) {
      res.send(mediaResponse);
    }

    if (req.query && req.query.option && req.query.option === 'encrypted') {

      const zip = zlib.createGzip();
      const encrypt = crypto.createCipher('aes-256-ctr', 'DF4gssd43');

      return request.get(mediaResponse.data).pipe(zip).pipe(encrypt).pipe(res);
    }

    return request.get(mediaResponse.data).pipe(res);

  },
};