const express = require('express');
const service = require('./game.service');
const path = require('path');

const router = express.Router();

let authMiddleware = require('../authentication/auth/auth.middlewares')

// routes
router.get('/start' , startGame);
router.get('/bet', authMiddleware.isAuth, betGame);
// router.get('/bet', betGame);

module.exports = router;

async function startGame(req, res, next) {
  try {
    const result = service.startGame();
    return res.status(200).json({
      success: true,
      result,
    });
  } catch (e) {
    res.status(400).json({ Error: e.message });
  }
}

/**
 * Get game page betting
 */
async function betGame(req, res, next) {
  // console.log(path.join(__dirname, '/public'));
  // res.sendFile(path.join(__dirname + '/../public/index.html'));
  let user = await service.getUser(req.query.user_id);
  console.log(user.bankaccount.dataValues.amount);
  res.render('index', {
      user: user
  });
}
