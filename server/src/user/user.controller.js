const express = require('express');
const service = require('./user.service');
const common = require('../core/common.service');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

const router = express();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use(upload.array()); 

router.post('/register', signUp);
router.post('/login', signIn);
router.post('/deposit', deposit);
router.post('/setting', setting);
router.get('/matches-history', matchesHistory);
router.get('/transfers-history', getTransfersHistory);
router.get('/choice-to-number-map', getChoiceToNumbberMap);
router.get('/account', getBankAccount);

router.post('/end-game', endGame);
router.post('/blockUser', blockUser);
router.post('/wallet', getWallet);
router.get('/get-members', getMembers);

router.get('/get_account', getAccount);
router.post('/post_edit_profile', postEditProfile);

module.exports = router; 

async function signUp(req, res, next) {
  try {
    let result =  await service.signUp(req.body);
    return res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ Error: e.message });
  }
}

async function signIn(req, res, next) {
  try {
    let user = await service.signIn(req.body);

    if(user && user.status){
      return res.status(200).json({
        result:{
          id: user.id,
          avatar: user.image,
          name: user.name
        },
        success: true,
        message: ""
      });
    } else {
      return res.status(200).json({
        success: false,
        message: 'Đăng nhập thất bại'
      });
    }
  } catch (e) {
    res.status(400).json({ Error: e.message })
  }
  
}

async function deposit(req, res, next) {
  try {
    var user = await service.deposit(req.body);
    return res.status(200).json({
      success: true,
      message: ''
    });
  } catch (e) {
    res.status(400).json({ Error: e.message })
  }
}


async function setting(req, res, next) {
  try {

    await service.createOption(req.body);
    return res.status(200).json({
      success: true,
      message: ''
    });
  } catch (e) {
    res.status(400).json({ Error: e.message })
  }
}

async function matchesHistory(req, res, next){
  try {
    var result = await service.getMatchesHistory(req.query);
    return res.status(200).json({
      success: true,
      result: result,
      message: ''
    });
  } catch (e) {
    res.status(400).json({ Error: e.message })
  }
}

async function getTransfersHistory(req, res, next){
  try {
    var result = await service.getTransfersHistory(req.query);
    return res.status(200).json({
      success: true,
      result: result,
      message: ''
    });
  } catch (e) {
    res.status(400).json({ Error: e.message })
  }
}

async function getChoiceToNumbberMap(req, res, next){
  try {
    var result = await service.getChoiceToNumbberMap();
    return res.status(200).json({
      success: true,
      result: result,
      message: ''
    });
  } catch (e) {
    res.status(400).json({ Error: e.message })
  }
}

async function getBankAccount(req, res, next){
  try {
    var result = await service.getBankAccount(req.query);
    return res.status(200).json({
      success: true,
      result: result,
      message: ''
    });
  } catch (e) {
    res.status(400).json({ Error: e.message })
  }
}

async function getAccount(req, res, next) {
  try {
      let params = req.query;

      let userId = Number(params.user_id);
      if (userId || userId === 0) {
          let result = await service.getAccount(userId);
          if ('fbUID' in result.user) {
              delete result.user.fbUID;
          }

          if ('gg_email' in result.user) {
              delete result.user.gg_email;
          }

          return res.status(200).json({
                success: true,
                result: result,
                message: ''
            });
      } else {
        return res.status(200).json({
          success: false,
          result: [],
          message: ''
        });
      }
  } catch (e) {
      return res.status(400).json({ Error: e.message })
  }
}

async function postEditProfile(req, res, next) {
  try {
    let params = req.body;
    let dataEdit = {
      user_id: params.user_id,
      name: params.name,
      phone: params.phone,
      address: params.address,
    }

    if (dataEdit.user_id || dataEdit.user_id === 0) {
      if (dataEdit.name === null || dataEdit.name === "") {
        return common.responseError(res, 200, "Tên không sữa trống");
      }

      if (dataEdit.phone === null || dataEdit.phone === "") {
        return common.responseError(res, 200, "Số điện thoại không sữa trống");
      }

      if (dataEdit.address === null || dataEdit.address === "") {
        return common.responseError(res, 200, "Địa chỉ không được sữa trống");
      }

      let userAfterEdit = await service.updateUser(dataEdit);
      if (userAfterEdit) {
        if ('fbUID' in userAfterEdit) {
          delete userAfterEdit.fbUID;
        }

        if ('gg_email' in userAfterEdit) {
          delete userAfterEdit.gg_email;
        }
        return common.responseSuccess(res, "", userAfterEdit);
      } else {
        return common.responseError(res, 200, "User không tồn tại");
      }
    } else {
      return common.responseError(res, 200, "Không xác định được đang chỉnh sữa user nha");
    }
  } catch (e) {
    return common.responseErrorCatch(res, e);
  }
}

async function blockUser(req,res,next) {
  try {
    let isSuccess = await service.blockUser(req.body);

    if (!isSuccess) {
      return res.status(404).json({
        success: false,
        message: "Entity Not Found"
      })
    }

    return res.status(200).json({
      success: true,
      message: ''
    });
  } catch (e) {
    res.status(400).json({ Error: e.message })
  }
}


async function endGame(req, res, next) {
  try {
    let endGame = await service.endGame(req.body);
    return res.status(200).json(endGame);
  } catch (e) {
    res.status(400).json({ Error: e.message })
  }
}

async function getWallet(req, res, next) {
  try {
    let wallets = await service.getWallet(req.body)

    if(!wallets.length) {
      return res.status(404).json({
        success: false,
        message: 'Entity Not Found'
      });
    }

    return res.status(200).json({
      success: true,
      result: wallets,
      message: ''
    });
  } catch (e) {
    res.status(400).json({ Error: e.message })
  }
}

async function getMembers(req, res, next) {
  try {
    const members = await service.getMembers(req.query);
    return res.status(200).json({
      result: members,
      success: true,
      message: ''
    });
  } catch (e) {
    res.status(400).json({ Error: e.message })
  }
}
