const User = require('../../models/users');
const TransferHistory = require('../../models/transfershistory');
const BankAccountModel = require('../../models/bankaccounts');
const Option = require('../../models/options');
const MatchesHistory = require('../../models/matcheshistory');
const Character = require('../../models/characters');
const BankAccount = require('../../models/bankaccounts');

const validator = require('validator');

let user = new User();
let transferhistory = new TransferHistory();
let bankAccount = new BankAccountModel();
let option = new Option();
let matcheshistory = new MatchesHistory();
let character = new Character();
let bankaccount = new BankAccount();


const signUp = async (params) => {
  // var account;
  // if(params.fbUID){
  //   account = await user.getAccountByFB(params.fbUID);
  // } else if (params.gg_mail) {
  //   account = await user.getAccountByGG(params.gg_mail)
  // } else {
  //   return {
  //     success: false,
  //     message: 'Register fail',
  //   };
  // }
  // if(account){
  //   return {
  //     success: false,
  //     message: 'Account is exist',
  //   }
  // }
  // user.createUser(params);
  // return {
  //   success: true,
  //   message: ''
  // };

  // Fix đăng ký
  let error = null;
  let account = [];

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
  bankAccountNewData.amount = 0;
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

const getWallet = async (params) => {
    const {user_id} = params;
    return await bankAccount.getUserWallets(user_id);
}

const getMembers = async (query) => {
  let { page = 1, limit = 10, search } = query;
  page = page - 1;
  const { Op } = user;
  const result = await user.mUser.findAll({
    attributes: ['id', 'name', 'address', 'phone'],
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
  updateUser
};
