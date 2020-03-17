const mongoose = require('mongoose');
const superUserSchema = mongoose.Schema(
	{
		sendMail: Boolean,
		emailValidationRequired: Boolean
	},
	{ timestamps: true }
);

module.exports = SuperUser = mongoose.model('tms_super_user', superUserSchema);
