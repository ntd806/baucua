const User = require('../../models/users');
const TransferHistory = require('../../models/transfershistory');


let user = new User();
let transferhistory = new TransferHistory();



const signUp = (params) => {
  user.createUser(params);
  return params;
};

const signIn = async (params) => {
  const result = await user.login(params);
  return result;
}

const deposit = async(params) => {
  params.status = 1;
  const result = await transferhistory.createTransferHistory(params);
}
module.exports = {
  signUp, signIn, deposit
};
