import { SET_ALERT, REMOVE_ALERT, SET_CURRENT_MODULE } from './types';

export const showAlert = alert => dispatch => {
	dispatch({
		type: SET_ALERT,
		payload: alert
	});
};

export const removeAlert = id => dispatch => {
	dispatch({
		type: REMOVE_ALERT,
		payload: id
	});
};

export const setCurrentModule = moduleData => dispatch => {
	dispatch({
		type: SET_CURRENT_MODULE,
		payload: moduleData
	});
};
