const randToken = require('rand-token');
const bcrypt = require('bcrypt');

// const authService = require('./auth.service');
const adminService = require('../../admin/admin.service');
const authMethod = require('./auth.methods');

const jwtVariable = require('../../variables/jwt');
const { SALT_ROUNDS } = require('../../variables/auth');

// exports.register = async (req, res) => {
// 	const username = 'ok';
// 	const user = await userModel.getUser(username);
// 	if (user) res.status(409).send('Tên tài khoản đã tồn tại.');
// 	else {
// 		const hashPassword = '123456'//bcrypt.hash(req.body.password, SALT_ROUNDS);
// 		const newUser = {
// 			username: username,
// 			password: hashPassword,
// 		};
// 		const createUser = await userModel.createUser(newUser);
// 		if (!createUser) {
// 			return res
// 				.status(400)
// 				.send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
// 		}
// 		return res.send({
// 			username,
// 		});
// 	}
// };

exports.login = async(username, password, res) => {
    let user = await adminService.getUserByUsername(username);
    if (!user) {
        return {
            success: false,
            status: 401,
            message: 'Tên đăng nhập không tồn tại.'
        };
    }
    // let hash = bcrypt.hashSync(password, 10);
    // console.log(hash);
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    // console.log(isPasswordValid)
    if (!isPasswordValid) {
        return {
            success: false,
            status: 401,
            message: 'Mật khẩu không chính xác.'
        };
    }

    const accessTokenLife =
        process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
    const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

    console.log(user);
    const dataForAccessToken = {
        userId: user.user_name,
    };
    const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife,
    );

    if (!accessToken) {
        return {
            success: false,
            status: 401,
            message: 'Đăng nhập không thành công, vui lòng thử lại.'
        };
    }

    let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
    if (!user.token) {
        // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        await adminService.updateToken(user.id, refreshToken);
    } else {
        // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        refreshToken = user.token;
    }

    delete user.password;
    return {
        success: true,
        message: 'Đăng nhập thành công.',
        result: {
            accessToken: accessToken,
            refreshToken : refreshToken,
            user : user
        }
    };
};

exports.generateAccessToken = async (user_id) => {
    const accessTokenLife =
        process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
    const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

    const dataForAccessToken = {
        userId: user_id,
    };
    const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife,
    );
    return accessToken ? accessToken : null;
}

exports.generateRefreshToken = async () => {
    return randToken.generate(jwtVariable.refreshTokenSize);
}

exports.verifyToken = async (tokenFromClient) => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
    let verifyToken = await authMethod.verifyToken(tokenFromClient, accessTokenSecret);
    return verifyToken ? true : false;
}

exports.refreshToken = async(req, res) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization || req.headers.accesstoken || req.query.accessToken || req.headers.accessToken;
    if (!accessTokenFromHeader) {
        return res.status(400).send('Không tìm thấy access token.');
    }

    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).send('Không tìm thấy refresh token.');
    }

    const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
    const accessTokenLife =
        process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

    // Decode access token đó
    const decoded = await authMethod.decodeToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );
    if (!decoded) {
        return res.status(400).send('Access token không hợp lệ.');
    }

    const username = decoded.payload.username; // Lấy username từ payload

    const user = await userModel.getUser(username);
    if (!user) {
        return res.status(401).send('User không tồn tại.');
    }

    if (refreshTokenFromBody !== user.refreshToken) {
        return res.status(400).send('Refresh token không hợp lệ.');
    }

    // Tạo access token mới
    const dataForAccessToken = {
        username,
    };

    const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife,
    );
    if (!accessToken) {
        return res
            .status(400)
            .send('Tạo access token không thành công, vui lòng thử lại.');
    }
    return res.json({
        accessToken,
    });
};
