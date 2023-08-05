const User = require('../db/models/UserModel');

const UserService = {
	findUser: async email => {
		return await User.findOne({ email }, { password: 0 });
	},

	updateUser: async (userId, password) => {
		await User.updateOne({ _id: userId }, { password: password });
	},

	withdrawn: async email => {
		await User.updateOne({ email }, { isDeleted: true });
	},
};

module.exports = UserService;
