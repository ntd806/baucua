const express = require('express');
const service = require('./user.service');

const router = express.Router();

// routes
router.get('/signup', signUp);

module.exports = router;

async function signUp(req, res, next) {
  try {
    const result = service.signUp(req.body);
    return res.status(200).json({
      success: true,
      result,
    });
  } catch (e) {
    res.status(400).json({ Error: e.message });
  }
}
