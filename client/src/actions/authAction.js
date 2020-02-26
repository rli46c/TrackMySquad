import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
    LOGIN_SUCCESS,
    USER_LOADED,
    LOGOUT,
    AUTH_ERRORS,
    REG_SUCCESS,
    DE_REGISTER
} from './types';


// Create Admin and Basic Tables
export const createBareBoneStructure = () => async () => {
    const res = await axios.get('/api/auth/createAdmin');
    console.log(res.data);
}



export const loadUser = () => async (dispatch) => {

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        
        dispatch({
            type: AUTH_ERRORS,
            payload: err.response
        });
    }
};

export const registerUser = (userData) => async (dispatch) => {
   
    const config = { headers: { 'Content-Type': 'application/json' } };

    try {
        const res = await axios.post('/api/auth/register', userData, config);
        dispatch({
            type: REG_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log(err.response.data.errors);
        
        dispatch({
            type: AUTH_ERRORS,
            payload: err.response
        });
    }
};

export const loginUser = (userdata) => async (dispatch) => {
    
    const config = { headers: { 'Content-Type': 'application/json' }};
    const body = JSON.stringify(userdata);

    try {
        const res = await axios.post('/api/auth/login', body, config);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        
        dispatch(loadUser());

    } catch (err) {
        
        dispatch({
            type: AUTH_ERRORS,
            payload: err.response
        });
    }
};


// Logout / Clear Profile
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};

// Set registration status to false
export const deRegister = () => (dispatch) => {
    dispatch({ type: DE_REGISTER });
};