const User = require('../../models/users');
const TransferHistory = require('../../models/transfershistory');
const Option = require('../../models/options');
const MatchesHistory = require('../../models/matcheshistory');
const Character = require('../../models/characters');
const BankAccount = require('../../models/bankaccounts');
const { param } = require('./user.controller');


let user = new User();
let transferhistory = new TransferHistory();
let option = new Option();
let matcheshistory = new MatchesHistory();
let character = new Character();
let bankaccount = new BankAccount();



const signUp = (params) => {
  user.createUser(params);
  return params;
};

const signIn = async (params) => {
  return await user.login(params);
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
  if(!params.user_id){
    return {
      success: false,
      message: 'User id not empty'
    };
  }
  let is_block = await bankaccount.getIsBlock(params.user_id);
  if(is_block){
    return {
      success: false,
      message: 'User is block'
    };
  }
  let amount = await bankaccount.getAmount(params.user_id);
  var data = {
    user_id: params.user_id,
    win: params.winer == 1 ? 1 : 0,
    lose: params.winer ==2 ? 1 : 0,
    type_bet: params.type_bet,
    place_bet: params.place_bet,
    stake: params.stake
  }
  if((parseInt(amount) + parseInt(params.stake)) > 0 ){
    bankaccount.addAmount(params.user_id, parseInt(amount) + parseInt(params.stake));
    data.status = 1;
    matcheshistory.createMatchesHistory(data);
    return {
      success: true,
      message: ''
    };
  } else {
    data.status = 0;
    matcheshistory.createMatchesHistory(data);
    return {
      success: false,
      message: 'Stake greater Amount'
    };
  }
  
}

const editProfile = async (params) => {
  if(!params.user_id){
    return {
      success: false,
      message: 'User id not empty'
    };
  }
  var getUser = await user.getUser(params.user_id);
  if(getUser){
    await user.editProfile(params);
    return {
      success: true,
      message: ''
    }
  } else {
    return {
      success: false,
      message: 'User id not exist'
    };
  }
}

const updateRefreshToken = async (id, refreshToken) => {
    await user.updateRefreshToken(id, refreshToken);
}
module.exports = {
  signUp, signIn, deposit, blockUser, createOption, getMatchesHistory, getTransfersHistory, getChoiceToNumbberMap, getBankAccount, endGame, editProfile, updateRefreshToken
};
