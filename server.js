const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const { index } = require('./api-routes/index');
const { registerUser } = require('./api-routes/users/users');

app.use(bodyParser.json());

/* Start: Entry point of the entire app */
app.get('/', index);
/* End: Entry point of the entire app */

/*Start: User routes. Note: usersOps = usersOperations */
app.get('/register', (req, res) => {
  registerUser(req, res);
});
/*End: User routes*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
