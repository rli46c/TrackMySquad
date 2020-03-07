import {
	GET_ALL_MEMBERS,
	GET_ALL_USER_TYPES,
	ADD_TEAM_MEMBER,
	DELETE_TEAM_MEMBER,
	SET_MEMBER_TO_EDIT,
	UPDATE_TEAM_MEMBER,
	SET_ADD_MEMBER_DIALOG,
	SET_EDIT_MEMBER_DIALOG,
	TEAM_ERRORS,
	SET_MANAGE_TEAMLIST
} from '../actions/types';

const initailState = {
	teamMembers: [],
	projectNamelist: [],
	userTypes: [],
	memberToEdit: {},
	addMemberDialogOpen: false,
	editMemberDialogOpen: false,
	teamErrors: [],
	addMemberlistDialogOpen: false
};

export default (state = initailState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_MEMBERS:
			return {
				...state,
				teamMembers: payload.teamMember,
				projectNamelist: payload.project
			};

		case GET_ALL_USER_TYPES:
			return {
				...state,
				userTypes: payload
			};

		case SET_ADD_MEMBER_DIALOG:
			return {
				...state,
				addMemberDialogOpen: payload
			};

		case ADD_TEAM_MEMBER:
<<<<<<< HEAD
			return {
				...state,
				teamMembers: [payload, ...state.teamMembers]
			};

		case DELETE_TEAM_MEMBER:
			return {
				...state,
				teamMembers: state.teamMembers.filter(member => member._id !== payload)
			};

		case SET_MEMBER_TO_EDIT:
			return {
				...state,
				memberToEdit: payload,
				editMemberDialogOpen: true
			};

		case SET_EDIT_MEMBER_DIALOG:
			return {
				...state,
				editMemberDialogOpen: false
			};

=======
			let projectAlreadyInState = false;
			state.projectNamelist.map(project =>
				project._id === payload.projectUpdated._id
					? (projectAlreadyInState = true)
					: null
			);
			console.log(projectAlreadyInState);

			return {
				...state,
				teamMembers: [payload.addedUser, ...state.teamMembers],
				projectNamelist:
					projectAlreadyInState === true
						? state.projectNamelist.map(project =>
								project._id === payload.projectUpdated._id
									? payload.projectUpdated
									: project
						  )
						: [...state.projectNamelist, payload.projectUpdated]
				// projectNamelist: state.projectNamelist.map(project => project._id == payload.projectUpdated ? project.teamMember.push)
			};

		case DELETE_TEAM_MEMBER:
			return {
				...state,
				teamMembers: state.teamMembers.filter(member => member._id !== payload)
			};

		case SET_MEMBER_TO_EDIT:
			return {
				...state,
				memberToEdit: payload,
				editMemberDialogOpen: true
			};

		case SET_EDIT_MEMBER_DIALOG:
			return {
				...state,
				editMemberDialogOpen: false
			};

>>>>>>> 8f02254cb5ac6e79f6c9fb3be8df85d5db556009
		case UPDATE_TEAM_MEMBER:
			return {
				...state,
				teamMembers: state.teamMembers.map(member =>
					member._id === payload._id ? payload : member
				)
			};
		case SET_MANAGE_TEAMLIST:
			return {
				...state,
				addMemberlistDialogOpen: payload
			};
		case TEAM_ERRORS:
			return {
				...state,
				teamErrors: payload
			};

		default:
			return state;
	}
};
