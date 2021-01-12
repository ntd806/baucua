const User = require('../../models/users');
const TransferHistory = require('../../models/transfershistory');
const Option = require('../../models/options');
const MatchesHistory = require('../../models/matcheshistory');
const Character = require('../../models/characters');

let user = new User();
let transferhistory = new TransferHistory();
let option = new Option();
let matcheshistory = new MatchesHistory();
let character = new Character();



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

const getMatchesHistory = async(params) => {
  return await matcheshistory.getMatchesHistory(params);
}
const getTransfersHistory = async(params) => {
  return await transferhistory.getTransferHistory(params);
}

const getChoiceToNumbberMap = async() =>{
  return await character.getChoiceToNumbberMap();
}

module.exports = {
  signUp, signIn, deposit, createOption, getMatchesHistory, getTransfersHistory, getChoiceToNumbberMap
};
