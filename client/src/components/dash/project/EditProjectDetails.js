import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Slide, 
    FormControl, InputLabel, NativeSelect, Button, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { setEditMemberDialog, getAllUserTypes, updateMember } from '../../../actions/teamAction';
import { getAllCompanyTypes } from '../../../actions/companyAction';
import UserTypesCard from './ProjectTypesCard';
import CompanyTypesCard from '../company/CompanyTypesCard';




const useStyles = makeStyles(theme=>({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        //   width: '100%',
        },
        marginRight: theme.spacing(2)
    },
    dialogTitle: {
        textAlign: 'right'
    },
    spanTitle: {

    },
    spanGap: {
        padding: '0px 30%'
    },
    times: {
        color: '#555'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export const EditProjectDetails = ({
    company: { companyTypes }, 
    team: { editMemberDialogOpen, memberToEdit, userTypes }, 
    setEditMemberDialog,
    getAllUserTypes,
    getAllCompanyTypes,
    updateMember }) => {

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [companyType, setCompanyType] = useState('');

    useEffect(()=>{
        getAllUserTypes();    
    }, [getAllUserTypes]);

    useEffect(()=>{
        getAllCompanyTypes();    
    }, [getAllCompanyTypes]);

    useEffect(()=>{
        setFirstName(memberToEdit.firstName);
        setLastName(memberToEdit.lastName);
        setUserEmail(memberToEdit.userEmail);
        setUserType(memberToEdit.userType);
        setCompanyType(memberToEdit.companyType);
        
    }, [memberToEdit]);

    const onUserTypeSelect = (e) => {
        const selectedUserType = {
            _id: e.target.value,
            userType: e.target.options[e.target.selectedIndex].text
        };

        setUserType(selectedUserType);
    };

    const onCompanyTypeSelect = (e) => {
        const selectedCompanyType = {
            _id: e.target.value,
            companyType: e.target.options[e.target.selectedIndex].text
        };

        setCompanyType(selectedCompanyType);
    };

    const onReset = (e) => {
        e.preventDefault();

        setUserType({ _id: '' })
        setCompanyType({ _id: '' });
        setFirstName('');
        setLastName('');
        setUserEmail('');
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const memberData = { 
            _id: memberToEdit._id, 
            userType, companyType, firstName, lastName, userEmail
        };
        
        updateMember(memberData);
        onReset(e);
        setEditMemberDialog(false);
    }

    const classes = useStyles();

    return (
    <Dialog keepMounted disableBackdropClick onClose={ ()=>setEditMemberDialog(false) }
    open={editMemberDialogOpen} TransitionComponent={Transition} fullWidth={fullWidth} 
    maxWidth={maxWidth} aria-labelledby="add-member-profile" aria-describedby="add-member-modal">
        <DialogTitle className={ classes.dialogTitle } id="add-member-profile">
            <span className={ classes.spanTitle }>Edit Member Profile</span>
            <span className={ classes.spanGap }>&nbsp;</span>
            <Close className={ classes.times } onClick={ ()=>setEditMemberDialog(false) } />
        </DialogTitle>
        <DialogContent>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}
                onKeyPress={ (e)=>{ (e.key === 'Enter') && e.preventDefault() } } id="add-member-modal">
                {/* <DialogContentText>Some Text</DialogContentText> */}
                <FormControl variant="standard" className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="member-type">Member Type</InputLabel>
                    <NativeSelect value={ userType._id } onChange={ onUserTypeSelect } id="member-type" autoFocus tabIndex="1" >
                        <option value="" />
                        { userTypes.map((type, id) => <UserTypesCard key={id} usrType={type} />) }
                    </NativeSelect>
                </FormControl>
                <FormControl variant="standard" className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="company-type">Company Type</InputLabel>
                    <NativeSelect value={ companyType._id } onChange={ onCompanyTypeSelect } id="company-type" tabIndex="2" >
                        <option value="" />
                        { companyTypes.map((type, id) => <CompanyTypesCard key={id} compType={type} />) }
                    </NativeSelect>
                </FormControl>
                <TextField value={ firstName } onChange={ (e)=>setFirstName(e.target.value) } label="First Name" variant="outlined" fullWidth tabIndex="3" />
                <TextField value={ lastName } onChange={ (e)=>setLastName(e.target.value) } label="Last Name" variant="outlined" fullWidth tabIndex="4" />
                <TextField value={ userEmail } onChange={ (e)=>setUserEmail(e.target.value) } label="Email" variant="outlined" fullWidth tabIndex="5" />
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={onReset} color="primary" tabIndex="-1">
                Reset
            </Button>
            <Button onClick={ onSubmit } color="secondary" variant="contained" tabIndex="0">
                Update Profile
            </Button>
        </DialogActions>
    </Dialog>
    );
};

EditProjectDetails.propTypes = {
    team: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired,
    setEditMemberDialog: PropTypes.func.isRequired,
    getAllUserTypes: PropTypes.func.isRequired,
    getAllCompanyTypes: PropTypes.func.isRequired,
    updateMember: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    team: state.team,
    company: state.company
});

const mapDispatchToProps = {
    setEditMemberDialog, getAllUserTypes, getAllCompanyTypes, updateMember
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectDetails);