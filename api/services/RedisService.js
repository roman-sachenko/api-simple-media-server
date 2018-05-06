const redis = require('redis');
const config = {
  connection: {
    host: 'localhost',
    port: 6379,
  }
};


let instance = null;

module.exports = class RedisService {
  constructor(connectionOptions) {
    if (!instance) {
      this._serviceProvider = redis;
      this._serviceClient = redis.createClient(config.connection);
      instance = this;
    } 
    // this = instance;

  }

  _getServiceProvider() {
    return instance._serviceProvider;
  }

  _getServiceClient() {
    return instance._serviceClient;
  }

  set(key, value) {
    return instance._getServiceClient(key, value).set(key, value, 'EX', 900);
  }

  get(key) {
    const self = instance;
    return new Promise((resolve, reject) => {

      self._getServiceClient().get(key, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
};