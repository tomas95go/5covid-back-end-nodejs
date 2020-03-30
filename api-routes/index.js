const express = require('express');
const router = express.Router();

const index = router.get('/', (req, res) => {
  res.send('welcome');
});

module.exports = {
  index: index,
};
