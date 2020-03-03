import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, TableRow, TableCell, IconButton } from '@material-ui/core';
import { Edit, DeleteForever } from '@material-ui/icons';

import { deleteMember, setMemberToEdit } from '../../../actions/teamAction';


const useStyles = makeStyles(theme => ({
    tableCell: {
        whiteSpace: 'normal',
        wordWrap: 'break-word'
    }
}));

export const MemberCard = ({ 
    memberData: { _id, firstName, lastName, userType, projectName, userEmail }, 
    deleteMember, 
    setMemberToEdit }) => {

    const onEdit = () => {
        setMemberToEdit({
            _id, firstName, lastName, userType, projectName, userEmail
        });
    };

    const onDelete = () => {
        deleteMember(_id);
    };

    const classes = useStyles();

    return (
        <TableRow>
            <TableCell className={ classes.tableCell }>{ firstName }</TableCell>
            <TableCell className={ classes.tableCell }>{ lastName }</TableCell>
            <TableCell>{ userType.userType }</TableCell>
            <TableCell className={ classes.tableCell }>{ userEmail }</TableCell>
            <TableCell align="right">
                <input type="button" id="edit-member-profile" style={{ display: 'none' }} />
                <label htmlFor="edit-member-profile" onClick={onEdit}>
                    <IconButton color="primary" aria-label="Edit Profile" component="span">
                        <Edit />
                    </IconButton>
                </label>
            </TableCell>
            <TableCell align="right">
                <input type="button" id="delete-member-profile" style={{ display: 'none' }} />
                <label htmlFor="delete-member-profile" onClick={onDelete} >
                    <IconButton color="primary" aria-label="Delete Profile" component="span">
                        <DeleteForever />
                    </IconButton>
                </label>
            </TableCell>
        </TableRow>
    );
};

MemberCard.propTypes = {
    memberData: PropTypes.object.isRequired,
    deleteMember: PropTypes.func.isRequired,
    setMemberToEdit: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    deleteMember, setMemberToEdit
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberCard);
