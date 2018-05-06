const fs = require('fs');
const path = require('path');

module.exports = {
  async getFiles(req, res, next) {

    try {
      const files = await getFileList();
      res.send({ success: true, data: files });
    } catch (err) {
      res.status(500).send({ success: false, err });
    }
  },
};

const getFileList = async () => {
  return new Promise((resolve, reject) => {
    const FILES_PATH = path.normalize(`${__dirname}/../../files/`);

    fs.readdir(FILES_PATH, (err, files) => {
      if (err) {
        return reject(err);
      }
      return resolve(files);
    });
  });
};