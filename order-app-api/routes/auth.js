const fs = require('fs');
const router = require('express').Router();
const cryperto = require('../services/crpyto')
const ValidateLogin = require('../validates/login');
const authModel = require('../models/auth');
const notify = require('../configs/notify');


// POST login page
router.post('/login',async function (req, res, next) {

	ValidateLogin.validator(req);
	let errors = req.validationErrors();
	if (errors) {
		__utils.responses(res,400 , 400, '', errors);
	} else {

		let username = req.body.username.trim();
		let password = req.body.password.trim();
		const usersObject = JSON.parse(fs.readFileSync('./common/user.json', 'utf8'));
		const info = usersObject.find(el => el.email == username && el.password == password);
		try {
			if (info) {
				delete info.password
				let userInfo = {};
				userInfo.id = info.id;
				userInfo.email = info.email;
				userInfo.name = info.name;
				userInfo.login_at 	= Date.now();
				userInfo.tokenId = info.token;
				userInfo.userToken = cryperto.simpleEncrypt(JSON.stringify(info));
				// Save token into mongoose
				await authModel.saveToken({ ...info, login_at: userInfo.login_at, user_token: userInfo.userToken});
				__utils.responses(res,200 , 200, userInfo, '');
			} else {
				__utils.responses(res,200 , 400, '',[
					{
						"param": "error",
						"msg": notify.ERROR_LOGIN
					}
				]);
			}
		} catch (e) {
			console.log("error", e)
			__utils.responses(res,500 , 500, '');
		}
	}
});

// Verify token
router.get('/verify', async function (req, res, next) {
	const usersObject = JSON.parse(fs.readFileSync('./common/user.json', 'utf8'));
	let params = req.headers.authorization.split(" ");
	let inforDecrypt =  cryperto.simpleDecrypt(params[1].trim());

	if (!inforDecrypt) {
		__utils.responses(res, 401, 401, '', {
			msg : "Unauthorize!"
		});
	} else {
		inforDecrypt = JSON.parse(inforDecrypt)
		const info = usersObject.find(function (el) {
			return el.email == inforDecrypt.email
		});
		try {
			if (info) {
				delete info.password
				let userInfo = {};
				userInfo.id = info.id;
				userInfo.email = info.email;
				userInfo.name = info.name;
				userInfo.login_at = Date.now();
				userInfo.tokenId = info.token;
				userInfo.user_token = cryperto.simpleEncrypt(JSON.stringify(info));

				__utils.responses(res, 200, 200, userInfo, '');
			} else {
				__utils.responses(res, 200, 400, '', [
					{
						"param": "error",
						"msg": notify.ERROR_LOGIN
					}
				]);
			}
		} catch (e) {
			console.log("error", e)
			__utils.responses(res, 500, 500, '');
		}
	}
});

module.exports = router;
