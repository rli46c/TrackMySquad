const mongoose = require('mongoose');
const userTypeSchema = mongoose.Schema({
    userType: String
});

module.exports = UserTypes = mongoose.model('zzz_user_types', userTypeSchema);