const express = require('express');
const service = require('./user.service');
const bodyParser = require('body-parser');
const authMethod = require('./auth.methods');
var multer = require('multer');
var upload = multer();
const randToken = require('rand-token');
const jwtVariable = require('../../variables/jwt');
const {SALT_ROUNDS} = require('../../variables/auth');

const router = express();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use(upload.array()); 





router.post('/register', signUp);

router.post('/login', signIn);

router.post('/deposit', deposit);


router.post('/setting', setting);

router.get('/matches-history', matchesHistory);

router.post('/blockUser', blockUser);

router.get('/transfers-history', getTransfersHistory);


router.get('/choice-to-number-map', getChoiceToNumbberMap);

router.get('/account', getBankAccount);

router.post('/end-game', endGame);

router.post('/edit-profile', editProfile);


module.exports = router;

async function signUp(req, res, next) {
  try {
    await service.signUp(req.body);
    return res.status(200).json({
      success: true,
      message: ""
    });
  } catch (e) {
    res.status(400).json({ Error: e.message });
  }
}

async function signIn(req, res, next) {
  try {
    var user = await service.signIn(req.body);
    if(user && user.status){
      const accessTokenLife =
        process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
      const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

      const dataForAccessToken = {
        username: user.name,
      };
      const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife,
      );
      console.log(accessToken);
      if (!accessToken) {
        return res
          .status(401)
          .send('Đăng nhập không thành công, vui lòng thử lại.');
      }
      

      let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
      if (!user.refreshToken) {
        // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        await service.updateRefreshToken(user.id, refreshToken);
      } else {
        // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        refreshToken = user.refreshToken;
      }

      return res.status(200).json({
        msg: 'Đăng nhập thành công.',
        accessToken,
        refreshToken,
        user,
      });
    } else {
      return res.status(400).json({
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

async function editProfile(req, res,next) {
  try {
    let editProfile= await service.editProfile(req.body);
    return res.status(200).json(editProfile);
  } catch (e) {
    res.status(400).json({ Error: e.message })
  } 
}