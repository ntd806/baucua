const express = require('express');
const bodyParser = require('body-parser');
const randToken = require('rand-token');
const multer = require('multer');

const common = require('../../src/core/common.service');
const auth = require('../authentication/auth/auth.service');

const upload = multer();

const router = express();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use(upload.array());

router.post('/login', signIn);

module.exports = router;

async function signIn(req, res, next) {
    try {
        let params = req.body;

        let username = params.username;
        let password = params.password;

        if (!username) {
            common.responseError(res, 200, 'Bạn chưa điền username')
        }

        if (!password) {
            common.responseError(res, 200, 'Bạn chưa điền mật khẩu')
        }
        let authAdmin = await auth.login(username, password, res);

        if (authAdmin.success) {

        } else {
            return common.responseError(res, authAdmin.status, authAdmin.message)
        }
        // if (authAdmin) {
        //     let message = 'Đăng nhập thành công';
        //     return common.responseSuccess(res, message, authAdmin)
        // } else {
        //     let message = 'Tên đăng nhập không tồn tại.';
        //
        // }
    } catch (e) {
        return common.responseErrorCatch(res, e);
    }
}
