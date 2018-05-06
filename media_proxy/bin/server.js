const express = require('express');
const app = express();
const config = require('../config/env');
const router = express.Router();

const controller = require('../app/controllers/media.controller');

router
  .get('/media/:urlEncrypted', controller.getFile);

app.use('/', router);


app.listen(config.ENV_PORT, () => {
  console.log(`Media Proxy: running on port ${config.ENV_PORT}`);
});