import { SET_ALERT, REMOVE_ALERT, SET_CURRENT_MODULE } from '../actions/types';

const initialState = {
	alertMessages: [],
	currentModule: { moduleRoute: 'dash', moduleName: 'Dashboard' }
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

		case SET_CURRENT_MODULE:
			return {
				...state,
				currentModule: payload
			};

		default:
			return state;
	}
};
