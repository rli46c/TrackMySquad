const mongoose = require('mongoose');
const usersSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true
		},
		lastName: String,
		userName: {
			type: String,
			unique: true
		},
		userPass: String,
		userType: {
			type: mongoose.Types.ObjectId,
			ref: 'zzz_user_types'
		},
		userCompanies: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'tms_company'
			}
		],
		userEmail: {
			type: String,
			required: true,
			unique: true
		},
		verifiedEmail: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
);

module.exports = Users = mongoose.model('tms_users', usersSchema);
