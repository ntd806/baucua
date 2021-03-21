const { ANIMAlS } = require('../constants');
const User = require('../../models/users');
let user = new User();

const startGame = () => {
  let result = [];
  let i = 0;
  while (i < 3) {
    let index = Math.floor(Math.random() * 6);
    let idx = result.findIndex(({ id }) => id === index);
    if (idx === -1) {
      result.push(Object.assign({ quantity: 1 }, ANIMAlS[index] || {}));
    } else {
      result[idx].quantity = result[idx].quantity + 1;
    }
    i++;
  }
  return result;
};

const getUser = async (user_id) => {
  if (user_id || user_id === 0) {
    var getUser = await user.getUserById(user_id);
  }
  return getUser;
}

module.exports = {
  startGame, getUser
};
