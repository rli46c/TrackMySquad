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
	SET_CURRENT_PROJECT,
	ADD_MEM_TO_CURR_PRJ,
	REM_MEM_FRM_CURR_PRJ,
	PROJECT_ERRORS,
	GET_PROJECT_NAMES,
	SET_MANAGE_TEAM_DIALOG,
	SET_MNG_TEAM_MEM_DIALOG,
	SET_CRNT_PRJ_CRNT_MEM_DATA,
	SET_PROJECT_LIST_DIALOG,
	SET_CRNT_PRJ_FROM_TEAMLIST,
	ADD_CRNT_MEM_PRJ_LIST
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

export const getProjectNames = currentUser => async dispatch => {
	if (typeof currentUser !== 'undefined') {
		try {
			const res = await axios.get(
				`/api/project/getProjectNames/${currentUser}`
			);
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

export const showManageTeamDialog = dialogOpen => async dispatch => {
	dispatch({
		type: SET_MANAGE_TEAM_DIALOG,
		payload: dialogOpen
	});
};

export const setCurrentProject = projectData => dispatch => {
	dispatch({
		type: SET_CURRENT_PROJECT,
		payload: projectData
	});
};

export const addMemToCurrPrj = memberData => dispatch => {
	dispatch({
		type: ADD_MEM_TO_CURR_PRJ,
		payload: memberData
	});
};

export const remMemFrmCurrPrj = memberId => dispatch => {
	dispatch({
		type: REM_MEM_FRM_CURR_PRJ,
		payload: memberId
	});
};

export const setMngTeamMemDialog = dialogOpen => dispatch => {
	dispatch({
		type: SET_MNG_TEAM_MEM_DIALOG,
		payload: dialogOpen
	});
};

export const setCrntPrjCrntMemData = memberData => dispatch => {
	dispatch({
		type: SET_CRNT_PRJ_CRNT_MEM_DATA,
		payload: memberData
	});
};

export const showProjectDialog = projectDialog => dispatch => {
	dispatch({
		type: SET_PROJECT_LIST_DIALOG,
		payload: projectDialog
	});
};

export const setProjectList = projectList => dispatch => {
	// console.log('projectList', projectList);
	dispatch({
		type: SET_CRNT_PRJ_FROM_TEAMLIST,
		payload: projectList
	});
};

export const addCrntprjlist = prjdata => dispatch => {
	console.log('prjdata', prjdata);

	dispatch({
		type: ADD_CRNT_MEM_PRJ_LIST,
		payload: prjdata
	});
};
