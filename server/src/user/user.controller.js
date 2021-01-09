const express = require('express');
const service = require('./user.service');

const router = express.Router();

// routes
router.post('/register', signUp);

router.post('/login', signIn);

module.exports = router;

async function signUp(req, res, next) {
  try {
    await service.signUp(req.query);
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
    var user = await service.signIn(req.query);
    console.log(user);
    if(user && user.status){
      return res.status(200).json({
        result:{
          avatar: user.image,
          name: user.username
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