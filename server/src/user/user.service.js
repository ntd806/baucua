const User = require('../../models/users');
const TransferHistory = require('../../models/transfershistory');
const Option = require('../../models/options');


let user = new User();
let transferhistory = new TransferHistory();
let option = new Option();



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

const createOption = async(params) => {
  const result = await option.createOption(params);
}
module.exports = {
  signUp, signIn, deposit, createOption
};
