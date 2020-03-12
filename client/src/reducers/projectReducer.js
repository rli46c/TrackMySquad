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
	PROJECT_ERRORS,
	GET_PROJECT_NAMES
} from '../actions/types';

const initailState = {
	projects: [],
	teamusers: [],
	projectNames: [],
	projectTypes: [],
	projectToEdit: {},
	currentProject: {},
	addProjectDialogOpen: false,
	editProjectDialogOpen: false,
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
