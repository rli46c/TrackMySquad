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
		acceptTnC: {
			type: Boolean,
			default: false
		},
		userStatus: {
			type: mongoose.Types.ObjectId,
			ref: 'zzz_status_types'
		},
		userMeta: {
			type: mongoose.Types.ObjectId,
			ref: 'tms_users_metas'
		}
	},
	{ timestamps: true }
);

module.exports = Users = mongoose.model('tms_users', usersSchema);
