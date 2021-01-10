const User = require('../../models/users');
let user = new User();

const signUp = (params) => {
  user.createUser(params);
  return params;
};

const signIn = async (params) => {
  const result = await user.login(params);
  return result;
}

module.exports = {
  signUp, signIn
};
