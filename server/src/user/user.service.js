const User = require('../../models/users');
const TransferHistory = require('../../models/transfershistory');
const BankAccountModel = require('../../models/bankaccounts');
const Option = require('../../models/options');
const MatchesHistory = require('../../models/matcheshistory');
const Character = require('../../models/characters');
const BankAccount = require('../../models/bankaccounts');
const ConversionRate = require('../../models/conversion_rate');

const validator = require('validator');

let user = new User();
let transferhistory = new TransferHistory();
let bankAccount = new BankAccountModel();
let option = new Option();
let matcheshistory = new MatchesHistory();
let character = new Character();
let bankaccount = new BankAccount();
let conversionRate = new ConversionRate();

// common -------------
const getUserById = async (id) => {
  return await user.getUserById(id);;
}

const signUp = async (params) => {
  let error = null;
  let account = [];
  const AMOUNT = 100;

  if(params.fbUID){
    account = await user.getAccountByFB(params.fbUID);
  }

  if (account && account.length === 0 && params.gg_email) {
    let isGmail = validator.isEmail(params.gg_email);
    if (!isGmail) {
      return {
        success: false,
        message: 'Register fail - Sai định dạng Gmail',
      };
    }
    account = await user.getAccountByGG(params.gg_email)
  }

  if(account && account.length > 0){
    return {
      success: false,
      message: 'Account is exist',
    }
  }

  let userNewData = {}
  let isReq = params.fbUID || params.gg_email;
  if (!isReq) {
    return {
      success: false,
      message: 'Register fail - Thiếu trường bắt buộc',
    };
  } else {
    userNewData.fbUID = params.fbUID;
    userNewData.gg_email = params.gg_email;
    userNewData.name = params.name;
    userNewData.address = params.address;
    userNewData.phone = params.phone;
  }

  // tạo mới user
  let userNew = await user.createUser(userNewData).catch(e => error = e);

  if (error) {
    return {
      success: false,
      message: error
    };
  }

  // khởi tạo tài khoản cho userNew
  let bankAccountNewData = {} ;
  bankAccountNewData.user_id = userNew.id;
  bankAccountNewData.amount = AMOUNT;
  bankAccountNewData.is_block = 1; // mở
  bankAccountNewData.status = 1; // default và không dùng đén

  let bankAccountNew = await bankaccount.createBankAccount(bankAccountNewData).catch(e => error = e);

  return {
    success: true,
    message: "Register success"
  };
};

const signIn = async (params) => {
  const result = await user.login(params);
  console.log(result.bankaccount['amount']);
  return result;
}

const deposit = async(params) => {
  params.status = 1;
  const result = await transferhistory.createTransferHistory(params);
}

const transferService = {}
transferService.transfer = async (userFrom, userTo, money) => {
  let result = {};
  let isPush = false;
  let bankUserTo = await bankAccount.getBankAccountByUserId(userTo.id);
  if (!bankUserTo) {
    // khởi tạo tài khoản cho userNew
    let bankAccountNewData = {} ;
    bankAccountNewData.user_id = userTo.id;
    bankAccountNewData.amount = 0;
    bankAccountNewData.is_block = 1; // mở
    bankAccountNewData.status = 1; // default và không dùng đén
    bankUserTo = await bankaccount.createBankAccount(bankAccountNewData)
  }
  let transHis = await bankaccount.transfer(userFrom, userTo, bankUserTo, money);
  bankUserTo.amount += money;
  if (money >= 0) {
    isPush = true;
  } else {
    isPush = false;
  }

  result.transferHistory = transHis;
  result.bankDestination = bankUserTo;
  result.destination = userTo;
  result.arrival= userTo;
  return {
    isPush: isPush,
    result: result
  }
}

const transferHistoryService = {};
transferHistoryService.getTransfersHistory = async (query) => {
  let { page = 1, limit = 10, search } = query;
  page = page - 1;
  try {
    transferhistory.mTransferHistory.belongsTo(user.mUser, {foreignKey: 'destination_id', as: 'destination'})
    transferhistory.mTransferHistory.belongsTo(user.mUser, {foreignKey: 'arrival_id',  as: 'arrival'})
  } catch (e) {

  }

  const result = await transferhistory.mTransferHistory.findAll({
    where: {
      user_id: query.user_id
    },
    offset: +(limit * page),
    limit: +limit,
    include: [{model: user.mUser , as: 'destination' , attributes: ['name']},{model: user.mUser , as: 'arrival' , attributes: ['name']}]
  },{raw: true});
  return result;
}
transferHistoryService.validate = async (params) => {
  let userArrival = null;
  let arrival_id = Number(params.user_id);
  if (arrival_id || arrival_id === 0) {
    userArrival = await user.getUserById(arrival_id);
  }

  if (userArrival === null) {
    return {
      success: false,
      message: 'người chuyển đi không tồn tại'
    };
  }

  let destination_id = Number(params.destination_id);
  let userDestination = null;
  if (destination_id || destination_id === 0) {
    userDestination = await user.getUserById(destination_id);
  }

  if (userDestination === null) {
    return{
      success: false,
      message: 'người chuyển đến không tồn tại'
    };
  }

  if (userDestination.id === userDestination.id) {
    return {
      success: false,
      message: 'người chuyển đi và đến trùng nhau'
    };
  }
}

const conversionRateService = {};
conversionRateService.getAll = async () => {
    return await conversionRate.getAll();
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

const getBankAccount = async (userId) => {
  return await bankaccount.getBankAccount(userId);
}

const getAccount = async (userId) => {
  let account = await user.getUserById(userId);
  if (account) {
    let bankAccount = await bankaccount.getBankAccountByUserId(userId);
    bankAccount.user = account
    return bankAccount;
  } else {
    return null;
  }
}

const blockUser = async (params) => {
  const {user_id, is_block} = params;

  const oUser = await user.getUserById(user_id);

  if (oUser === null) {
    return false; 
  }

  //When want to block user and status of user is actived
  if (is_block && oUser.status) {
    await user.updateUser(user_id, {status: 0});
  }

  //When want to unblock user and status of user is blocked
  if (!is_block && !oUser.status) {
    await user.updateUser(user_id, {status: 1});
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

const getMembers = async (query) => {
  let { page = 1, limit = 10, search } = query;
  page = page - 1;
  const { Op } = user;
  const result = await user.mUser.findAll({
    attributes: ['id', 'name', 'address', 'phone', 'status'],
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          address: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
    offset: +(limit * page),
    limit: +limit,
  });
  return result;
};

const updateUser = async (dataEdit) => {
  let userDB = await user.getUserById(dataEdit.user_id);

  if (userDB) {
    let userUpdate = await user.updateUser(userDB.id, dataEdit);
    userUpdate = await user.getUserById(dataEdit.user_id);
    return userUpdate;
  } else {
    return null;
  }
}

/**
 * Get setting
 * Author ntd806
 * time 01/23/2021
 */
const getOption = async (params) => {
  const {user_id, is_admin} = params;
  if (is_admin) {
    return await Option.getOption();
  }
  else{
    return null;
  }
}

module.exports = {
  signUp,
  signIn,
  deposit,
  blockUser,
  createOption,
  getMatchesHistory,
  getTransfersHistory,
  getChoiceToNumbberMap,
  getBankAccount,
  getAccount,
  endGame,
  getWallet,
  getMembers,
  updateUser,
  transferHistoryService,
  conversionRateService,
  transferService,
  getUserById,
  getOption,
};
