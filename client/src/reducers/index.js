import { combineReducers } from 'redux';
import layout from './layoutReducer';
import auth from './authReducer';
import company from './companyReducer';
import team from './teamReducer';
import project from './projectReducer';

export default combineReducers({
    layout, auth, company, team, project
});