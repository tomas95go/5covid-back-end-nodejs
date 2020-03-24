const express = require('express');
const app = express();
const port = 3000;
let router = express.Router();
getDuenios = require('./routes/index');

app.use('/', getDuenios);

app.use(`/user/:id`, getDuenios);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
