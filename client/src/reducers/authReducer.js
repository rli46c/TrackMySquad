import {
    LOGIN_SUCCESS,
    AUTH_ERRORS,
    USER_LOADED,
    LOGOUT
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem('token'),
    loading: true,
    user: null,
    authErrors: []
};

export default ( state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:    
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };

        case LOGIN_SUCCESS:            
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: payload.isAuthenticated
            };

        case LOGOUT:
            localStorage.removeItem('token');
            return {
              ...state,
              token: null,
              isAuthenticated: false,
              loading: false
            };

        case AUTH_ERRORS:
            return {
                ...state,
                authErrors: [...state.authErrors, payload]
            };
    
        default:
            return state;
    }
};