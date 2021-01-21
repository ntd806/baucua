const User = require('../../models/users');
const TransferHistory = require('../../models/transfershistory');
const BankAccountModel = require('../../models/bankaccounts');
const Option = require('../../models/options');
const MatchesHistory = require('../../models/matcheshistory');
const Character = require('../../models/characters');
const BankAccount = require('../../models/bankaccounts');

let user = new User();
let transferhistory = new TransferHistory();
let bankAccount = new BankAccountModel();
let option = new Option();
let matcheshistory = new MatchesHistory();
let character = new Character();
let bankaccount = new BankAccount();


const signUp = async (params) => {
  var account;
  if(params.fbUID){
    account = await user.getAccountByFB(params.fbUID);
  } else if (params.gg_mail) {
    account = await user.getAccountByGG(params.gg_mail)
  } else {
    return {
      success: false,
      message: 'Register fail',
    };
  }
  if(account){
    return {
      success: false, 
      message: 'Account exist',
    }
  }
  user.createUser(params);
  return {
    success: true, 
    message: ''
  };
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

const getMatchesHistory = async(params) => {
  return await matcheshistory.getMatchesHistory(params);
}

const getTransfersHistory = async(params) => {
  return await transferhistory.getTransferHistory(params);
}

const getChoiceToNumbberMap = async() =>{
  return await character.getChoiceToNumbberMap();
}

const getBankAccount = async(params) => {
  return await bankaccount.getBankAccount(params);
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

const endGame = async (params) => {
  var bet = [];
  // var param =JSON.parse(params);

  //ko json vẫn đc
  // no bị đổi tên biến chứ ko liên quan đến nó
  // biến beta bị thành beta
  // var bet = params.bet.split(', ');
  var array = params.bet.split(",");
 // var array = JSON.parse(params.bet);
  console.log(typeof array);
  console.log(array);
  // array.forEach(element => console.log(typeof parseInt(element)));
  array.forEach(element => bet.push(parseInt(element)));
  console.log("bet");
  console.log(bet.length);
  if(!params.user_id){
    return {
      success: false,
      message: 'User id not empty'
    };
  }

  let is_block = await bankaccount.getIsBlock(params.user_id);
  if(is_block ==1){
    return {
      success: false,
      message: 'User is block'
    };
  } else if(is_block == -1){
    return {
      success: false,
      message: 'Not have bank account'
    }
  }
  
  let amount = await bankaccount.getAmount(params.user_id);
  if(amount < params.stake*params.bet.length){
      return {
        success: false,
        message: 'The amount placed is greater than the amount in the account'
      }
  }
  var result  = Math.floor(Math.random() * 8) + 1;
  for (const element of bet) {
    var data = {
      user_id: params.user_id,
      win: element == result ? 1 : 0,
      lose: element == result ? 0: 1,
      type_bet: params.type_bet,
      place_bet: element,
      stake: params.stake
    }
    var getAmount = await bankaccount.getAmount(params.user_id);
    if(result == element){
      await bankaccount.addAmount(params.user_id, parseInt(getAmount) + parseInt(params.stake)*8);
    }else{
      await bankaccount.addAmount(params.user_id, parseInt(getAmount) - parseInt(params.stake));
    }
    data.status = 1;
    await matcheshistory.createMatchesHistory(data);
    
  };
  
  return {
    success: true,
    result,
    message: ''
  }
  
  
}

const getWallet = async (params) => {
    const {user_id} = params;
    return await bankAccount.getUserWallets(user_id);
}

module.exports = {
  signUp, signIn, deposit, blockUser, createOption, getMatchesHistory, getTransfersHistory, getChoiceToNumbberMap, getBankAccount, endGame, getWallet
};
