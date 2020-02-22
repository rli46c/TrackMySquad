import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import { Edit, DeleteForever } from '@material-ui/icons';

import { deleteCompany, setCompanyToEdit } from '../../../actions/companyAction';

export const CompanyCard = ({ 
    profileData: { _id, companyName, companyType, companyAddress }, 
    deleteCompany, 
    setCompanyToEdit }) => {

    const onEdit = () => {
        setCompanyToEdit({
            _id, companyName, companyType, companyAddress
        });
    };

    const onDelete = () => {
        deleteCompany(_id);
    };

    return (
        <TableRow>
            <TableCell>{companyName}</TableCell>
            <TableCell>{companyType.companyType}</TableCell>
            <TableCell>{companyAddress}</TableCell>
            <TableCell align="right">
                <input type="button" id="edit-company-profile" style={{ display: 'none' }} />
                <label htmlFor="edit-company-profile" onClick={onEdit}>
                    <IconButton color="primary" aria-label="Edit Profile" component="span">
                        <Edit />
                    </IconButton>
                </label>
            </TableCell>
            <TableCell align="right">
                <input type="button" id="delete-company-profile" style={{ display: 'none' }} />
                <label htmlFor="delete-company-profile" onClick={onDelete} >
                    <IconButton color="primary" aria-label="Delete Profile" component="span">
                        <DeleteForever />
                    </IconButton>
                </label>
            </TableCell>
        </TableRow>
    );
};

CompanyCard.propTypes = {
    profileData: PropTypes.object.isRequired,
    deleteCompany: PropTypes.func.isRequired,
    setCompanyToEdit: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    deleteCompany, setCompanyToEdit
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCard);