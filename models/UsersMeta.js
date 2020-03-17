const mongoose = require('mongoose');
const userMetaSchema = mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		ref: 'tms_users'
	},
	recentCompany: {
		type: mongoose.Types.ObjectId,
		ref: 'tms_company'
	},
	recentProject: {
		type: mongoose.Types.ObjectId,
		ref: 'tms_projects'
	},
	recentTask: String
});

module.exports = UsersMeta = mongoose.model('tms_users_meta', userMetaSchema);
