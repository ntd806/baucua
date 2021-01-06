const { ANIMAlS } = require('../constants');

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

module.exports = {
  startGame,
};
