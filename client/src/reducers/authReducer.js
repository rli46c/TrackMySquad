import {
	LOGIN_SUCCESS,
	REG_SUCCESS,
	USER_LOADED,
	LOGOUT,
	DE_REGISTER
} from '../actions/types';

const initialState = {
	isRegistered: false,
	isAuthenticated: false,
	token: localStorage.getItem('token'),
	loading: true,
	user: {}
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			};

		case REG_SUCCESS:
			return {
				...state,
				isRegistered: true,
				user: payload
			};

		case DE_REGISTER:
			return {
				...state,
				isRegistered: false
			};

		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			localStorage.setItem(
				'currentModule',
				JSON.stringify({ moduleRoute: 'dash', moduleName: 'Dashboard' })
			);
			return {
				...state,
				...payload,
				isAuthenticated: payload.isAuthenticated
			};

		case LOGOUT:
			localStorage.removeItem('token');
			localStorage.removeItem('currentModule');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				isRegistered: false,
				user: null,
				loading: false
			};

		default:
			return state;
	}
};
