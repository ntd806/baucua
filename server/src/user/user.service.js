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

const getWallet = async (params) => {
    const {user_id} = params;
    return await bankAccount.getUserWallets(user_id);
}

module.exports = {
    signUp, signIn, deposit, getWallet
};
