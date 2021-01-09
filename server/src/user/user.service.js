const User = require('../../models/users');

const signUp = (params) => {
  const { provider, id, email, image, token, idToken, accessToken} = params;
  User.create({
    provider,
    id,
    email,
    image,
    token,
    idToken,
    accessToken
  });
  return { provider, id, email, image, token, idToken, accessToken};
};

module.exports = {
  signUp,
};
