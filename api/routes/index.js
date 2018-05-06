const express = require('express');
const appRoute = express.Router({ strict: true });
const controller = require('../modules/fileList/fileList.controller');

appRoute
  .get('/media/files/', controller.getAll)
  .get('/media/files/:urlEncoded', controller.getOne);

module.exports = appRoute;


