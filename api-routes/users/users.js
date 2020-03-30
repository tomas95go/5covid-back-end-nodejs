const express = require('express');
const router = express.Router();
const { registerUser, listUsers } = require('../../controllers/users/users');

const users = [
  { id: 1, name: 'Tommy' },
  { id: 2, name: 'Octa' },
];

router.get('/register', (req, res) => {
  registerUser(req, res);
});

router.get('/signin/owner', (req, res) => {
  res.send('Sign In for Owners');
});

router.get('/signin/customer', (req, res) => {
  res.send('Sign In for Customers');
});

router.get('/list', (req, res) => {
  listUsers(req, res, users);
});

module.exports = router;
