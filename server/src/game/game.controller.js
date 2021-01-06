const express = require('express');
const service = require('./game.service');

const router = express.Router();

// routes
router.get('/start', startGame);

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
