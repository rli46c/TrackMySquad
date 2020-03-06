import axios from 'axios';
import {
	GET_ALL_MEMBERS,
	GET_ALL_USER_TYPES,
	ADD_TEAM_MEMBER,
	DELETE_TEAM_MEMBER,
	UPDATE_TEAM_MEMBER,
	TEAM_ERRORS,
	SET_ADD_MEMBER_DIALOG,
	SET_EDIT_MEMBER_DIALOG,
	SET_MEMBER_TO_EDIT,
	MANAGE_TEAMLIST
} from './types';

export const getAllMembers = () => async dispatch => {
	try {
		const res = await axios.get('/api/team');
		dispatch({
			type: GET_ALL_MEMBERS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: TEAM_ERRORS,
			payload: err.response
		});
	}
};

export const getMemberNamesAndDefaultRoles = () => async dispatch => {
	try {
		const res = await axios.get('/api/team/getNameRole');
		dispatch({
			type: GET_ALL_MEMBERS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: TEAM_ERRORS,
			payload: err.response
		});
	}
};

export const getAllUserTypes = () => async dispatch => {
	try {
		const res = await axios.get('/api/team/getAllUserTypes');

		dispatch({
			type: GET_ALL_USER_TYPES,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: TEAM_ERRORS,
			payload: err.response
		});
	}
};

export const addMember = memberData => async dispatch => {
	const config = { headers: { 'Content-Type': 'application/json' } };

	try {
		const res = await axios.post(
			'/api/team/addMemberProfile',
			memberData,
			config
		);

		dispatch({
			type: ADD_TEAM_MEMBER,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: TEAM_ERRORS,
			payload: err.response
		});
	}
};

export const deleteMember = idsObj => async dispatch => {
	const res = await axios.delete(
		`/api/team/deleteMember/${idsObj.userID}/${idsObj.teamMemberID}`
	);

	dispatch({
		type: DELETE_TEAM_MEMBER,
		payload: res.data
	});
};

export const updateMember = memberData => async dispatch => {
	const config = { headers: { 'Content-Type': 'application/json' } };
	try {
		const res = await axios.put(
			`/api/team/updateMemberProfile/${memberData._id}`,
			memberData,
			config
		);
		dispatch({
			type: UPDATE_TEAM_MEMBER,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: TEAM_ERRORS,
			payload: err.response
		});
	}
};

export const setAddMemberDialog = dialogOpen => dispatch => {
	dispatch({
		type: SET_ADD_MEMBER_DIALOG,
		payload: dialogOpen
	});
};

export const setEditMemberDialog = dialogOpen => dispatch => {
	dispatch({
		type: SET_EDIT_MEMBER_DIALOG,
		payload: dialogOpen
	});
};

export const setMemberToEdit = memberData => dispatch => {
	dispatch({
		type: SET_MEMBER_TO_EDIT,
		payload: memberData
	});
};

export const setManageTeamList = teamlist => dispatch => {
	dispatch({
		type: MANAGE_TEAMLIST,
		payload: teamlist
	});
};
