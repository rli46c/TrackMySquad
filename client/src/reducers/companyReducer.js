import {
    GET_COMPANIES,
    GET_ALL_COMPANY_TYPES,
    ADD_COMPANY,
    DELETE_COMPANY,
    UPDATE_COMPANY,
    SET_ADD_COMPANY_DIALOG,
    SET_EDIT_COMPANY_DIALOG,
    SET_COMPANY_TO_EDIT,
    COMPANY_ERRORS,
} from '../actions/types';

const initialState = {
    companies: [],
    companyTypes: [],
    addCompanyDialogOpen: false,
    editCompanyDialogOpen: false,
    companyToEdit: {},
    companyErrors: []
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_COMPANIES:
            return {
                ...state,
                companies: payload
            };

        case GET_ALL_COMPANY_TYPES:
            return {
                ...state,
                companyTypes: payload
            };

        case SET_ADD_COMPANY_DIALOG:
            return {
                ...state,
                addCompanyDialogOpen: payload
            };

        case ADD_COMPANY:
            return {
                ...state,
                companies: [payload, ...state.companies]
            };

        case DELETE_COMPANY:
            return {
                ...state,
                companies: state.companies.filter(company => company._id !== payload)
            };
        
        case SET_COMPANY_TO_EDIT:
            return {
                ...state,
                companyToEdit: payload,
                editCompanyDialogOpen: true
            };

        case SET_EDIT_COMPANY_DIALOG:
            return {
                ...state,
                editCompanyDialogOpen: payload
            };

        case UPDATE_COMPANY:            
            return {
                ...state,
                companies: state.companies.map(company => (company._id === payload._id) ? payload : company)
            };

        case COMPANY_ERRORS:
            return {
                ...state,
                companyErrors: payload
            };
    
        default:
            return state;
    }
};