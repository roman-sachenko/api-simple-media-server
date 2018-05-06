const crypto = require('crypto');



module.exports = class UrlEncoder {
  constructor(secret) {

    if (!secret) {
      throw Error('secret is not provided');
    }

    this._secret = secret;
    this._encryptionAlgorithm = 'aes192';
    this._serviceProvider = crypto;
    this._expiresIn = 900; //seconds
  }

  _getSecret() {
    return this._secret;
  }

  _getEncryptionAlgorithm() {
    return this._encryptionAlgorithm;
  }

  _getServiceProvider() {
    return this._serviceProvider;
  }

  _getExpiresIn() {
    return this._expiresIn;
  }

  _getExpirationDate() {
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + this._getExpiresIn());
    return currentDate;
  }

  encode(url) {
    const encodeData = {
      url,
      expires: this._getExpirationDate()
    };

    const toEncodeString = JSON.stringify(encodeData);


    const cipher = this._getServiceProvider().createCipher(this._getEncryptionAlgorithm(), this._getSecret())
    let crypted = cipher.update(toEncodeString, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  decode(encodedString) {
    const decipher = this._getServiceProvider().createDecipher(this._getEncryptionAlgorithm(), this._getSecret())
    let dec = decipher.update(encodedString, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return JSON.parse(dec);
  }
};