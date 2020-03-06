const mongoose = require('mongoose');
const statusTypeSchema = mongoose.Schema({
	statusType: String
});

module.exports = StatusTypes = mongoose.model(
	'zzz_status_types',
	statusTypeSchema
);
