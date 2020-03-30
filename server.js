const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes = require('./api-routes/index');

app.use(bodyParser.json());
/** Start: Entry Point of the app routes **/
app.use('/', routes);
/** End: Entry Point of the app routes**/
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
