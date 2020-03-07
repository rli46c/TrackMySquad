const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
	memberID: {
		type: mongoose.Types.ObjectId,
		ref: 'tms_users'
	},
	roleInProject: {
		type: mongoose.Types.ObjectId,
		ref: 'zzz_user_types'
	},
	statusType: {
		type: mongoose.Types.ObjectId,
		ref: 'zzz_status_types'
	}
});

const projectSchema = mongoose.Schema({
	companyID: {
		type: mongoose.Types.ObjectId,
		ref: 'tms_company',
		required: true
	},
	projectName: String,
	projectTypeID: {
		type: mongoose.Types.ObjectId,
		ref: 'zzz_project_types'
	},
	teamMembers: [memberSchema]
});

module.exports = Projects = mongoose.model('tms_projects', projectSchema);
