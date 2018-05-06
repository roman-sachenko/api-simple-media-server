const config = require('../config/env');
const request = require('request-promise-native');

module.exports = class CallListService {
  static async getFiles() {
    const response = await request({
      method: 'GET',
      uri: `${config.SERVER_MEDIA_STORAGE_URL}/files/`,
      json: true,
    });
    

    if (response.err) {
      throw err;
    }

    const fileList = response.data.map((item) => {
      return `${config.SERVER_MEDIA_STORAGE_URL}/${item}`;
    });

    return fileList;

  }
};