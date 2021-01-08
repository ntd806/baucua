const User = require('../../models/users');

const signUp = (params) => {
  const { fbMail, ggMail, name, address, gender, birthday } = params;
  User.create({
    fbMail,
    ggMail,
    name,
    address,
    gender,
    birthday,
  });
  return { fbMail, ggMail, name, address, gender, birthday };
};

module.exports = {
  signUp,
};
