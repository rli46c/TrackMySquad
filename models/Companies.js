const mongoose = require('mongoose');
const companySchema = mongoose.Schema(
	{
		companyOwner: {
			type: mongoose.Types.ObjectId,
			ref: 'tms_users',
			required: true
		},
		companyName: {
			type: String,
			required: true
		},
		companyType: {
			type: mongoose.Types.ObjectId,
			ref: 'zzz_company_types',
			required: true
		},
		companyContact: String,
		companyAddress: {
			type: mongoose.Types.ObjectId,
			ref: 'tms_addresses'
		}
	},
	{ timestamps: true }
);

module.exports = Companies = mongoose.model('tms_company', companySchema);
