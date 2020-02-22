const mongoose = require('mongoose');
const projectTypeSchema = mongoose.Schema({
    projectType: String
});

module.exports = ProjectTypes = mongoose.model('zzz_project_types', projectTypeSchema);