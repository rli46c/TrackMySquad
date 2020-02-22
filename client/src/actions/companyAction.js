import axios from 'axios';
import {
    GET_COMPANIES,
    GET_ALL_COMPANY_TYPES,
    ADD_COMPANY,
    DELETE_COMPANY,
    UPDATE_COMPANY,
    SET_ADD_COMPANY_DIALOG,
    SET_EDIT_COMPANY_DIALOG,
    COMPANY_ERRORS,
    SET_COMPANY_TO_EDIT
} from './types';

export const getAllCompanies = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/company');
        
        dispatch({
            type: GET_COMPANIES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMPANY_ERRORS,
            payload: err.response
        });
    }
};

export const getCompanyNames = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/company/getCompanyNames');
        
        dispatch({
            type: GET_COMPANIES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMPANY_ERRORS,
            payload: err.response
        });
    }
};

export const getAllCompanyTypes = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/company/getAllCompanyTypes');
        dispatch({
            type: GET_ALL_COMPANY_TYPES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMPANY_ERRORS,
            payload: err.response
        });
    }
};

export const addCompany = (companyData) => async (dispatch) => {
    const config = { headers: { 'Content-Type': 'application/json' }};

    try {
        const res = await axios.post('/api/company/addCompanyProfile', companyData, config);
        
        dispatch({
            type: ADD_COMPANY,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMPANY_ERRORS,
            payload: err.response
        });
    }
};

export const deleteCompany = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/company/removeCompany/${id}`);
        
        dispatch({
            type: DELETE_COMPANY,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMPANY_ERRORS,
            payload: err.response
        });
    }
};

export const updateCompany = (companyData) => async (dispatch) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
        const res = await axios.put(`/api/company/updateCompanyProfile/${companyData._id}`, companyData, config);
        dispatch({
            type: UPDATE_COMPANY,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMPANY_ERRORS,
            payload: err.response
        });
    }
};

export const setAddCompanyDialog = (dialogOpen) => (dispatch) => {
    dispatch({
        type: SET_ADD_COMPANY_DIALOG,
        payload: dialogOpen
    });
};

export const setEditCompanyDialog = (dialogOpen) => (dispatch) => {
    dispatch({
        type: SET_EDIT_COMPANY_DIALOG,
        payload: dialogOpen
    });
};

export const setCompanyToEdit = (companyData) => (dispatch) => {
    dispatch({
        type: SET_COMPANY_TO_EDIT,
        payload: companyData
    });
};