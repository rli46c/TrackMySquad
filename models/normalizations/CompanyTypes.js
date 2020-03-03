const mongoose = require('mongoose');
const companyTypeSchema = mongoose.Schema({
    companyType: String
});

module.exports = CompanyTypes = mongoose.model('zzz_company_types', companyTypeSchema);