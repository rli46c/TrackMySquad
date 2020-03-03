const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
	memberID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'tms_users'
	},
	roleInProject: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'zzz_user_types'
	}
});

const projectSchema = mongoose.Schema({
	companyID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'tms_company',
		required: true
	},
	projectName: String,
	projectTypeID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'zzz_project_types'
	},
	teamMembers: [memberSchema]
});

module.exports = Projects = mongoose.model('tms_projects', projectSchema);
