const express = require('express');
const app = express();
const config = require('../config/env');


app.use('/api', require('../routes'))
  .use(routeNotFoundHandler)
  .use(mainErrorHandler);

app.listen(config.ENV_PORT, () => {
  console.log(`API: running on port ${config.ENV_PORT}`);
});


/**
 * Route Not Found Error Handler
 */
function routeNotFoundHandler(req, res, next) {
  res.status(404).send({ success: false, err: 'Not Found' });
}

/**
 * Catches all the errors and sends response
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function mainErrorHandler(err, req, res, next) {
  res.send({ success: false, err: err });
}


