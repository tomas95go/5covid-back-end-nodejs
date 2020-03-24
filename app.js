const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
let getDatos = require('./routes/index');

app.use(bodyParser.json());

app.use('/', getDatos);

app.use('/listado_negocios', getDatos);

app.use('/listado_negocios/:rubro', getDatos);

app.use('/test', getDatos);

app.use('/register_cliente', getDatos);

app.use('login', getDatos);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
