const express = require('express');
const service = require('./user.service');

const router = express.Router();

// routes
router.post('/signup', signUp);

module.exports = router;

async function signUp(req, res, next) {
  let user = {'permission_id':1, 'provider':'google', 'socialusers_id':1, 'email':'ntd806@gmail.com','image':'hinhnen','token':'kkk', 'id_token':'tokne', 'access_token':'tookem'}
  try {
    const result = service.findAll({
    where: {
    id: [1,2,3] // Same as using `id: { [Op.in]: [1,2,3] }`
    }
   });
    return res.status(200).json({
      success: true,
      result,
      message: {}
    });
  } catch (e) {
    res.status(400).json({ Error: e.message });
  }
}
