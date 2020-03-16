import {
	GET_ALL_PROJECTS,
	GET_ALL_PROJECT_TYPES,
	ADD_PROJECT,
	DELETE_PROJECT,
	UPDATE_PROJECT,
	SET_ADD_PROJECT_DIALOG,
	SET_EDIT_PROJECT_DIALOG,
	SET_PROJECT_TO_EDIT,
	SET_CURRENT_PROJECT,
	ADD_MEM_TO_CURR_PRJ,
	REM_MEM_FRM_CURR_PRJ,
	SET_MANAGE_TEAM_DIALOG,
	SET_MNG_TEAM_MEM_DIALOG,
	PROJECT_ERRORS,
	GET_PROJECT_NAMES,
	SET_CRNT_PRJ_CRNT_MEM_DATA
} from '../actions/types';

const initailState = {
	projects: [],
	projectNames: [],
	projectTypes: [],
	projectToEdit: {},
	currentProject: {},
	currentProjectTeamMembers: [],
	crntPrjTmMemIDs: [],
	crntPrjCrntMemData: {},
	addProjectDialogOpen: false,
	editProjectDialogOpen: false,
	mngPrjSnglMemDlgOpen: false,
	manageMembersDialogOpen: false,
	projectErrors: []
};

export default (state = initailState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_PROJECTS:
			return {
				...state,
				projects: payload
			};

		case GET_ALL_PROJECT_TYPES:
			return {
				...state,
				projectTypes: payload
			};

		case SET_ADD_PROJECT_DIALOG:
			return {
				...state,
				addProjectDialogOpen: payload
			};

		case ADD_PROJECT:
			return {
				...state,
				projects: [payload, ...state.projects]
			};

		case DELETE_PROJECT:
			return {
				...state,
				projects: state.projects.filter(member => member._id !== payload)
			};

		case SET_PROJECT_TO_EDIT:
			return {
				...state,
				projectToEdit: payload,
				editProjectDialogOpen: true
			};

		case SET_EDIT_PROJECT_DIALOG:
			return {
				...state,
				editProjectDialogOpen: false
			};

		case SET_CURRENT_PROJECT:
			return {
				...state,
				currentProject: payload
			};

		case ADD_MEM_TO_CURR_PRJ:
			state.currentProjectTeamMembers = state.currentProjectTeamMembers.filter(
				member => member._id !== payload._id
			);
			return {
				...state,
				currentProjectTeamMembers: [
					...state.currentProjectTeamMembers,
					payload
				],
				crntPrjTmMemIDs: [...state.crntPrjTmMemIDs, payload.memberID._id]
			};

		case REM_MEM_FRM_CURR_PRJ:
			return {
				...state,
				currentProjectTeamMembers: state.currentProjectTeamMembers.filter(
					member => member.memberID._id !== payload
				),
				crntPrjTmMemIDs: state.crntPrjTmMemIDs.filter(
					member => member !== payload
				)
			};

		// All Members Dialog
		case SET_MANAGE_TEAM_DIALOG:
			if (payload) {
				return {
					...state,
					manageMembersDialogOpen: payload
				};
			} else {
				return {
					...state,
					currentProjectTeamMembers: [],
					crntPrjTmMemIDs: [],
					manageMembersDialogOpen: payload
				};
			}

		// Single Member Dialog
		case SET_MNG_TEAM_MEM_DIALOG:
			if (payload) {
				return {
					...state,
					mngPrjSnglMemDlgOpen: payload
				};
			} else {
				return {
					...state,
					crntPrjCrntMemData: {},
					mngPrjSnglMemDlgOpen: payload
				};
			}

		case SET_CRNT_PRJ_CRNT_MEM_DATA:
			return {
				...state,
				crntPrjCrntMemData: payload
			};

		case UPDATE_PROJECT:
			return {
				...state,
				projects: state.projects.map(project =>
					project._id === payload._id ? payload : project
				)
			};
		case GET_PROJECT_NAMES:
			return {
				...state,
				projectNames: payload
			};
		case PROJECT_ERRORS:
			return {
				...state,
				projectErrors: payload
			};
		default:
			return state;
	}
};
