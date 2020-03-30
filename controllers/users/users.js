const registerUser = (req, res) => {
  res.send('Register user in controllers!');
};

const listUsers = (req, res, users) => {
  let userList = '';
  users.forEach((value, i) => {
    userList += `${value.name} \n`;
  });
  res.send(userList);
};

module.exports = {
  registerUser: registerUser,
  listUsers: listUsers,
};
