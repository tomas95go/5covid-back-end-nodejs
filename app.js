const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const logger = require('./middlewares/testing');

app.use(bodyParser.json());

app.use(logger);

app.get('/', (req, res) => {
  res.send('Nice!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
