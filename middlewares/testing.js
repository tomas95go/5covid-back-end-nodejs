const express = require('express');
const app = express();

const logger = app.use('/', (req, res, next) => {
  console.log('Console logged!');
  next();
});

module.exports = logger;
