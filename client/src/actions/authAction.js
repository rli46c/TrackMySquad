import axios from 'axios';
import { uuid } from 'uuidv4';
import setAuthToken from '../utils/setAuthToken';
import {
	LOGIN_SUCCESS,
	USER_LOADED,
	LOGOUT,
	SET_ALERT,
	REG_SUCCESS,
	DE_REGISTER,
	SET_CURRENT_MODULE
} from './types';

const handleError = (err, dispatch) => {
	if (err.hasOwnProperty('data')) {
		if (err.data.hasOwnProperty('errors')) {
			const errors = err.data.errors.map(error => ({
				id: uuid(),
				status: err.status,
				msg: error.msg
			}));

			dispatch({
				type: SET_ALERT,
				payload: errors
			});
		} else {
			console.error(err.data);
		}
	} else {
		console.error(err);
	}
};

export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (error) {
		error.hasOwnProperty('response')
			? handleError(error.response, dispatch)
			: console.error(error);
	}
};

export const registerUser = userData => async dispatch => {
	const config = { headers: { 'Content-Type': 'application/json' } };

	try {
		const res = await axios.post('/api/auth/register', userData, config);
		dispatch({
			type: REG_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		error.hasOwnProperty('response')
			? handleError(error.response, dispatch)
			: console.error(error);
	}
};

export const loginUser = userdata => async dispatch => {
	const config = { headers: { 'Content-Type': 'application/json' } };
	const body = JSON.stringify(userdata);

	try {
		const res = await axios.post('/api/auth/login', body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch({
			type: SET_CURRENT_MODULE,
			payload: { moduleRoute: 'dash', moduleName: 'Dashboard' }
		});

		dispatch(loadUser());
	} catch (error) {
		error.hasOwnProperty('response')
			? handleError(error.response, dispatch)
			: console.error(error);
	}
};

// Logout / Clear Profile
export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });
};

// Set registration status to false
export const deRegister = () => dispatch => {
	dispatch({ type: DE_REGISTER });
};
