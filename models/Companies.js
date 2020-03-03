const mongoose = require('mongoose');
const companySchema = mongoose.Schema({
    companyOwner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'tms_users', required: true 
    },
    companyName: String,
    companyType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'zzz_company_types'
    },
    companyAddress: String
});

module.exports = Companies = mongoose.model('tms_company', companySchema);