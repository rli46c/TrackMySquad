import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	makeStyles,
	AppBar,
	Button,
	Dialog,
	Divider,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormGroup,
	FormControl,
	Grid,
	InputLabel,
	IconButton,
	ListItemText,
	ListItem,
	List,
	NativeSelect,
	Paper,
	Slide,
	TextField,
	Toolbar,
	Typography
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import {
	getAllMembers,
	getAllUserTypes,
	showManageTeamDialog,
	addMember
} from '../../../actions/teamAction';
import { getProjectNames } from '../../../actions/projectAction';
import AlreadyMemberCard from './ManageTeam/AlreadyMemberCard';
import ReaminingMemberCard from './ManageTeam/RemainingMemberCard';
import ProjectNamesCard from '../project/ProjectNamesCard';
import UserTypesCard from './UserTypesCard';

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
	// root: {
	// 	'& > *': {
	// 		margin: theme.spacing(1)
	// 		//   width: '100%',
	// 	},
	// 	flexGrow: 1,
	// 	marginRight: theme.spacing(2)
	// },
	// dialogTitle: {
	// 	textAlign: 'right'
	// },
	// spanTitle: {},
	// spanGap: {
	// 	padding: '0px 25%'
	// },
	// times: {
	// 	color: '#555'
	// },
	// formControl: {
	// 	margin: theme.spacing(1),
	// 	minWidth: 120
	// },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export const AddNewMember = ({
	auth: {
		user: { _id: currentUser }
	},
	team: { teamMembers, userTypes, manageMembersDialogOpen },
	project: { currentProject, projectNames },
	getAllMembers,
	getAllUserTypes,
	getProjectNames,
	showManageTeamDialog,
	addMember
}) => {
	const [fullWidth] = useState(true);
	const [maxWidth] = useState('sm');

	const [userType, setUserType] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [userName, setUserName] = useState('');
	const [userPass, setUserPass] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [projectName, setProjectName] = useState('');

	useEffect(() => {
		if (teamMembers.length === 0) {
			getAllMembers(currentUser);
		}
	}, [currentUser, getAllMembers]);

	console.log('currentProject: ', currentProject);
	console.log('teamMembers: ', teamMembers);

	useEffect(() => {
		getProjectNames(currentUser);
	}, [currentUser, getProjectNames]);

	useEffect(() => {
		getAllUserTypes();
	}, [getAllUserTypes]);

	const onSelectUserType = e => {
		setUserType({
			_id: e.target.value,
			userType: e.target.options[e.target.selectedIndex].text
		});
	};

	const onSelectProjectName = e => {
		setProjectName({
			_id: e.target.value,
			projectName: e.target.options[e.target.selectedIndex].text
		});
	};

	const onReset = e => {
		e.preventDefault();
		setUserEmail('');
		setFirstName('');
		setLastName('');
		setUserName('');
		setUserPass('');
		setUserType('');
		setProjectName('');
	};

	const onSubmit = e => {
		e.preventDefault();

		const memberData = {
			userEmail,
			firstName,
			lastName,
			userName,
			userPass,
			userType,
			projectName
		};
		addMember(memberData);
		onReset(e);
		showManageTeamDialog(false);
	};

	const classes = useStyles();

	return (
		<div>
			<Dialog
				fullScreen
				open={manageMembersDialogOpen}
				onClose={() => showManageTeamDialog(false)}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={() => showManageTeamDialog(false)}
							aria-label='close'
						>
							<Close />
						</IconButton>
						<Typography variant='h6' className={classes.title}>
							Manage Project Members
						</Typography>
						<Button
							autoFocus
							color='inherit'
							onClick={() => showManageTeamDialog(false)}
						>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={4}>
							<Paper className={classes.paper}>
								<h3>Already Members</h3>
								<FormGroup column>
									{currentProject.teamMembers.length > 0 &&
										currentProject.teamMembers.map((member, id) => (
											<AlreadyMemberCard key={id} memberData={member} />
										))}
								</FormGroup>
							</Paper>
						</Grid>
						<Grid item xs>
							<Paper className={classes.paper}>
								<h3>Other Members</h3>
								<FormGroup row>
									{teamMembers.length > 0 &&
										teamMembers.map((member, id) => (
											<ReaminingMemberCard key={id} memberData={member} />
										))}
								</FormGroup>
							</Paper>
						</Grid>
					</Grid>
				</div>
				{/* <List>
					<ListItem button>
						<ListItemText primary='Phone ringtone' secondary='Titania' />
					</ListItem>
					<Divider />
					<ListItem button>
						<ListItemText
							primary='Default notification ringtone'
							secondary='Tethys'
						/>
					</ListItem>
				</List> */}
			</Dialog>
		</div>

		// <Dialog
		// 	keepMounted
		// 	disableBackdropClick
		// 	onClose={() => showManageTeamDialog(false)}
		// 	open={manageMembersDialogOpen}
		// 	TransitionComponent={Transition}
		// 	fullWidth={fullWidth}
		// 	maxWidth={maxWidth}
		// 	aria-labelledby='add-member-profile'
		// 	aria-describedby='add-member-modal'
		// >
		// 	<DialogTitle className={classes.dialogTitle} id='add-member-profile'>
		// 		<span className={classes.spanTitle}>Add New Member Profile</span>
		// 		<span className={classes.spanGap}>&nbsp;</span>
		// 		<Close
		// 			className={classes.times}
		// 			onClick={() => showManageTeamDialog(false)}
		// 		/>
		// 	</DialogTitle>
		// 	<DialogContent>

		// 	</DialogContent>
		// 	<DialogActions>
		// 		<Button onClick={onReset} color='primary' tabIndex='-1'>
		// 			Reset
		// 		</Button>
		// 		<Button
		// 			onClick={onSubmit}
		// 			color='secondary'
		// 			variant='contained'
		// 			tabIndex='0'
		// 		>
		// 			Add Member
		// 		</Button>
		// 	</DialogActions>
		// </Dialog>
	);
};

AddNewMember.propTypes = {
	auth: PropTypes.object.isRequired,
	team: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	showManageTeamDialog: PropTypes.func.isRequired,
	addMember: PropTypes.func.isRequired,
	getAllUserTypes: PropTypes.func.isRequired,
	getProjectNames: PropTypes.func.isRequired,
	getAllMembers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	team: state.team,
	project: state.project
});

const mapDispatchToProps = {
	showManageTeamDialog,
	addMember,
	getProjectNames,
	getAllUserTypes,
	getAllMembers
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewMember);