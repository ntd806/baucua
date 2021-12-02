const jwtVariable = require('../../variables/jwt');

const authMethod = require('./auth.methods');
const userService = require('../../user/user.service');

exports.isAuth = async (req, res, next) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.accesstoken || req.query.accessToken || req.headers.accessToken;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Not found access token!');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	// console.log(verified);
	if (!verified) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}
	try {
		if (typeof verified.payload.userId === 'string') {
			return next();
		} else {
			const user = await userService.getUserById(verified.payload.userId);
			req.user = user;
			return next();
		}

		// req.user = verified.payload.userId;
		// req.accessToken = accessTokenFromHeader;

	} catch (e) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}

};
