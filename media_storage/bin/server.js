const express = require('express');
const app = express();
const config = require('../config/env');
const controller = require('../app/controllers/media.controller');

const router = express.Router();

router.get('/files/', controller.getFiles);

app.use(express.static('files'));
app.use('/', router);



app.listen(config.ENV_PORT, () => {
  console.log(`Media Server: running on port ${config.ENV_PORT}`);
});