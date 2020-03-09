import axios from 'axios';
import {
	GET_ALL_PROJECTS,
	GET_ALL_PROJECT_TYPES,
	ADD_PROJECT,
	DELETE_PROJECT,
	UPDATE_PROJECT,
	SET_ADD_PROJECT_DIALOG,
	SET_EDIT_PROJECT_DIALOG,
	SET_PROJECT_TO_EDIT,
	PROJECT_ERRORS,
	GET_PROJECT_NAMES
} from './types';

export const getAllProjects = currentUser => async dispatch => {
	try {
		if (typeof currentUser !== 'undefined') {
			const res = await axios.get(`/api/project/${currentUser}`);
			dispatch({
				type: GET_ALL_PROJECTS,
				payload: res.data
			});
		}
	} catch (err) {
		dispatch({
			type: PROJECT_ERRORS,
			payload: err.response
		});
	}
};

export const getProjectNames = () => async dispatch => {
	try {
		const res = await axios.get('/api/project/getProjectNames');
		dispatch({
			type: GET_PROJECT_NAMES,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROJECT_ERRORS,
			payload: err.response
		});
	}
};

export const getAllProjectTypes = () => async dispatch => {
	try {
		const res = await axios.get('/api/project/getAllProjectTypes');

		dispatch({
			type: GET_ALL_PROJECT_TYPES,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROJECT_ERRORS,
			payload: err.response
		});
	}
};

export const addProject = projectData => async dispatch => {
	const config = { headers: { 'Content-Type': 'application/json' } };

	try {
		const res = await axios.post(
			'/api/project/addProject',
			projectData,
			config
		);

		dispatch({
			type: ADD_PROJECT,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROJECT_ERRORS,
			payload: err.response
		});
	}
};

export const deleteProject = id => async dispatch => {
	const res = await axios.delete(`/api/project/deleteProject/${id}`);

	dispatch({
		type: DELETE_PROJECT,
		payload: res.data
	});
};

export const updateProject = projectData => async dispatch => {
	const config = { headers: { 'Content-Type': 'application/json' } };
	try {
		const res = await axios.put(
			`/api/project/updateProjectDetails/${projectData._id}`,
			projectData,
			config
		);

		dispatch({
			type: UPDATE_PROJECT,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROJECT_ERRORS,
			payload: err.response
		});
	}
};

export const setAddProjectDialog = dialogOpen => dispatch => {
	dispatch({
		type: SET_ADD_PROJECT_DIALOG,
		payload: dialogOpen
	});
};

export const setEditProjectDialog = dialogOpen => dispatch => {
	dispatch({
		type: SET_EDIT_PROJECT_DIALOG,
		payload: dialogOpen
	});
};

export const setProjectToEdit = projectData => dispatch => {
	dispatch({
		type: SET_PROJECT_TO_EDIT,
		payload: projectData
	});
};
