const User = require('../db/models/UserModel');

const AuthService = {
	userLogin: async email => {
		return await User.findOne({ email });
	},
};

module.exports = AuthService;
