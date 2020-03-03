import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Slide,
    FormControl, InputLabel, NativeSelect, Button, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { getAllUserTypes, setAddMemberDialog, addMember } from '../../../actions/teamAction';
import CompanyTypesCard from '../company/CompanyTypesCard';
import UserTypesCard from './UserTypesCard';
import { getProjectNames } from '../../../actions/projectAction';
import ProjectNamesCard from '../project/ProjectNamesCard';

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
        padding: '0px 25%'
    },
    times: {
        color: '#555'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const AddNewMember = ({ 
    team: { userTypes, addMemberDialogOpen }, 
    project: { projectNames }, 
    getAllUserTypes,
    getProjectNames,
    setAddMemberDialog, 
    addMember }) => {

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');

    const [userType, setUserType] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [projectName, setProjectName] = useState('');

	useEffect(()=>{
		getProjectNames();	
	},[getProjectNames]);
	
    useEffect(()=>{
        getAllUserTypes();
    }, [getAllUserTypes]);

    const onSelectUserType = (e) => {
        setUserType({
            _id: e.target.value,
            userType: e.target.options[e.target.selectedIndex].text
        });
    };
	
	const onSelectProjectName = e => {
		setProjectName({
			_id:e.target.value,
			projectName: e.target.options[e.target.selectedIndex].text	
		});
	};
	

    const onReset = (e) => {
        e.preventDefault();
        setUserEmail('');
        setFirstName('');
        setLastName('');
        setUserName('');
        setUserPass('');
        setUserType('');
        setProjectName('');
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        const memberData = { 
            userEmail, firstName, lastName, userName, 
            userPass, userType, projectName 
        };
        addMember(memberData);
        onReset(e);
        setAddMemberDialog(false);
    };    

    const classes = useStyles();   
		console.log('projectid',projectNames);
    return (
    <Dialog keepMounted disableBackdropClick onClose={ ()=>setAddMemberDialog(false) }
    open={addMemberDialogOpen} TransitionComponent={Transition} fullWidth={fullWidth} 
    maxWidth={maxWidth} aria-labelledby="add-member-profile" aria-describedby="add-member-modal">
        <DialogTitle className={ classes.dialogTitle } id="add-member-profile">
            <span className={ classes.spanTitle }>Add New Member Profile</span>
            <span className={ classes.spanGap }>&nbsp;</span>
            <Close className={ classes.times } onClick={ ()=>setAddMemberDialog(false) } />
        </DialogTitle>
        <DialogContent>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}
                onKeyPress={ (e)=>{ (e.key === 'Enter') && e.preventDefault() } } id="add-member-modal">
                {/* <DialogContentText>Some Text</DialogContentText> */}

                 <FormControl variant="standard" className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="project-name">Project Name</InputLabel>
                    <NativeSelect value={ projectNames._id } onChange={ onSelectProjectName } id="project-name" >
                        <option value="" />
                        { projectNames.map((name, id) => <ProjectNamesCard key={id} projName={name} />) }
                    </NativeSelect>
                </FormControl>
                <FormControl variant="standard" className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="user-type">User Role</InputLabel>
                    <NativeSelect value={ userType._id } onChange={ onSelectUserType } id="user-type">
                        <option value="" />
                        { userTypes.map((type, id) => <UserTypesCard key={id} usrType={type} />) }
                    </NativeSelect>
                </FormControl>
                {/* <TextField value={ userType } onChange={ (e)=>setUserType(e.target.value) } label="User Type" variant="outlined" fullWidth tabIndex="2" /> */}
                <TextField value={ firstName } onChange={ (e)=>setFirstName(e.target.value) } label="First Name" variant="outlined" fullWidth tabIndex="3" />
                <TextField value={ lastName } onChange={ (e)=>setLastName(e.target.value) } label="Last Name" variant="outlined" fullWidth tabIndex="4" />
                <TextField value={ userName } onChange={ (e)=>setUserName(e.target.value) } label="User Name" variant="outlined" fullWidth tabIndex="5" />
                <TextField value={ userPass } onChange={ (e)=>setUserPass(e.target.value) } label="User Password" variant="outlined" fullWidth tabIndex="6" />
                <TextField value={ userEmail } onChange={ (e)=>setUserEmail(e.target.value) } label="User Email" variant="outlined" fullWidth tabIndex="7" type="Email" />
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={onReset} color="primary" tabIndex="-1">
                Reset
            </Button>
            <Button onClick={ onSubmit } color="secondary" variant="contained" tabIndex="0">
                Add Member
            </Button>
        </DialogActions>
    </Dialog>
    );
};

AddNewMember.propTypes = {
    team: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    setAddMemberDialog: PropTypes.func.isRequired,
    addMember: PropTypes.func.isRequired,
    getAllUserTypes: PropTypes.func.isRequired,
    getProjectNames: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    team: state.team,
    project: state.project
});

const mapDispatchToProps = {
    setAddMemberDialog, addMember, getProjectNames, getAllUserTypes
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewMember);
