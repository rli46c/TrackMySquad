import { SET_ALERT, REMOVE_ALERT } from './types';

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
