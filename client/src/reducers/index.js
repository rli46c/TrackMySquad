import { combineReducers } from 'redux';
import auth from './authReducer';
import company from './companyReducer';
import team from './teamReducer';
import project from './projectReducer';

export default combineReducers({
    auth, company, team, project
});