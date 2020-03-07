import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {
	alertMessages: []
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_ALERT:
			return {
				...state,
				alertMessages: Array.isArray(payload)
					? [...state.alertMessages, ...payload]
					: [...state.alertMessages]
			};

		case REMOVE_ALERT:
			return {
				...state,
				alertMessages: state.alertMessages.filter(alert => alert.id !== payload)
			};

		default:
			return state;
	}
};
