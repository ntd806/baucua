const jwtVariable = require('../../variables/jwt');

const authMethod = require('./auth.methods');
const userService = require('../../user/user.service');

exports.isAuth = async (req, res, next) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!verified) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}
	try {
		const user = await userService.getUserById(verified.payload.userId);
		req.user = user;
		return next();
	} catch (e) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}

};
