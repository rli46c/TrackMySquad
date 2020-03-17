const mongoose = require('mongoose');
const addrSchema = mongoose.Schema(
	{
		address1: String,
		address2: String,
		street: String,
		city: String,
		country: String,
		zip: Number
	},
	{ timestamps: true }
);

module.exports = Addresses = mongoose.model('tms_addresses', addrSchema);
