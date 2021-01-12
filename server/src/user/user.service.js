const User = require('../../models/users');
const TransferHistory = require('../../models/transfershistory');
const BankAccountModel = require('../../models/bankaccounts');

let user = new User();
let transferhistory = new TransferHistory();
let bankAccount = new BankAccountModel();


const signUp = (params) => {
    user.createUser(params);
    return params;
};

const signIn = async (params) => {
    const result = await user.login(params);
    return result;
}

const deposit = async (params) => {
    params.status = 1;
    const result = await transferhistory.createTransferHistory(params);
}

const blockUser = async (params) => {
  const {user_id, is_block} = params;

  const userInstance = user.getInstance();

  const oUser = await userInstance.findByPk(user_id);

  if (oUser === null) {
    return false;
  }

  //When want to block user and status of user is actived
  if (is_block && oUser.status) {
    await oUser.update({status: 0});
  }

  //When want to unblock user and status of user is blocked
  if (!is_block && !oUser.status) {
    await oUser.update({status: 1});
  }

  return true;
};


const getWallet = async (params) => {
    const {user_id} = params;
    return await bankAccount.getUserWallets(user_id);
}

module.exports = {
    signUp, signIn, deposit, blockUser, getWallet
};
