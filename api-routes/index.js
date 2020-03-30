const router = require('express').Router();
//userOps = User Operations
const userOps = require('./users/users');

router.get('/', (req, res) => {
  res.send(`Welcome to "Mi Turno Seguro"`);
});
/** Receive the user operations, from now on everything is going to be /user
 *  + whatever the route is in the userOps, if userOps has /register, route is
 *  /user/register
 **/
router.use('/user', userOps);

module.exports = router;
