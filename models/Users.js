const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	userName: {
		type: String,
		unique: true
	},
	userPass: String,
	userType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'zzz_user_types'
	},
	companyType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'zzz_company_types'
	},
	userEmail: {
		type: String,
		required: true,
		unique: true
	},
	userCompany: String,
	verifiedEmail: {
		type: Boolean,
		default: false
	}
});

module.exports = Users = mongoose.model('tms_users', usersSchema);
