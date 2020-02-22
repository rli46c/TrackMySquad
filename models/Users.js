const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    userPass: String,
    userType: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'zzz_user_types'
    },
    companyType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'zzz_company_types'
    },
    userEmail: String,
});

module.exports = Users = mongoose.model('tms_users', usersSchema);