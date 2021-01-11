const express = require('express');
const service = require('./user.service');
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
      return res.status(200).json({
        result:{
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