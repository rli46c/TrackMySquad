import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import {
	makeStyles,
	AppBar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormGroup,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	NativeSelect,
	Paper,
	Slide,
	Toolbar,
	Typography
} from '@material-ui/core';
import { Close, GroupAdd, Save } from '@material-ui/icons';
import {
	getAllMembers,
	setAddMemberDialog,
	getAllUserTypes
} from '../../../actions/teamAction';
import {
	addMemToCurrPrj,
	showManageTeamDialog,
	setMngTeamMemDialog
} from '../../../actions/projectAction';
import UserTypesCard from '../team/UserTypesCard';
import AlreadyMemberCard from '../project/ManageTeam/AlreadyMemberCard';
import ReaminingMemberCard from '../project/ManageTeam/RemainingMemberCard';

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
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const PaperComponent = props => {
	return (
		<Draggable
			handle='#draggable-dialog-title'
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
};

export const AddNewMember = ({
	auth: {
		user: { _id: currentUser }
	},
	team: { teamMembers, userTypes },
	project: {
		manageMembersDialogOpen,
		currentProject,
		currentProjectTeamMembers,
		crntPrjTmMemIDs,
		mngPrjSnglMemDlgOpen,
		crntPrjCrntMemData
	},
	getAllMembers,
	getAllUserTypes,
	showManageTeamDialog,
	setAddMemberDialog,
	addMemToCurrPrj,
	setMngTeamMemDialog
}) => {
	const [userType, setUserType] = useState('');

	useEffect(() => {
		if (teamMembers.length === 0) {
			getAllMembers(currentUser);
		}
	}, [teamMembers.length, currentUser, getAllMembers]);

	useEffect(() => {
		currentProject.teamMembers.map(member => addMemToCurrPrj(member));
	}, [addMemToCurrPrj, currentProject.teamMembers]);

	useEffect(() => {
		if (userTypes.length === 0) {
			getAllUserTypes();
		}
	}, [userTypes.length, getAllUserTypes]);

	useEffect(() => {
		typeof crntPrjCrntMemData !== 'undefined' &&
			setUserType(crntPrjCrntMemData.roleInProject);
	}, [crntPrjCrntMemData]);

	const onAddNew = e => {
		e.preventDefault();
		if (
			window.confirm(
				'Any changes made will not be saved.\nDo you want to continue?'
			)
		) {
			setAddMemberDialog(true);
			showManageTeamDialog(false);
		}
	};

	const onClose = e => {
		e.preventDefault();
		window.confirm('No changes will be saved.\nAre you sure?') &&
			showManageTeamDialog(false);
	};

	const onSubmit = e => {
		e.preventDefault();
		const arrayData = [
			{ id: '123' },
			{ id: '456' },
			{ id: '789' },
			{ id: '000' }
		];
		console.log(arrayData.findIndex(x => x.id === '789'));

		showManageTeamDialog(false);
	};

	const onSelectUserType = e => {
		setUserType({
			_id: e.target.value,
			userType: e.target.options[e.target.selectedIndex].text
		});
	};

	const onRemFrmProj = () => {};

	const onChngMemRole = () => {};

	const classes = useStyles();

	return (
		<Fragment>
			<div>
				<Dialog
					fullScreen
					open={manageMembersDialogOpen}
					onClose={onClose}
					TransitionComponent={Transition}
				>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								edge='start'
								color='inherit'
								onClick={onClose}
								aria-label='close'
							>
								<Close />
							</IconButton>
							<Typography variant='h6' className={classes.title}>
								Manage Project Members
							</Typography>
							<Button color='inherit' onClick={onAddNew}>
								<GroupAdd /> &nbsp; add new
							</Button>
							<Button autoFocus color='inherit' onClick={onSubmit}>
								<Save />
								&nbsp;save
							</Button>
						</Toolbar>
					</AppBar>
					<div className={classes.root}>
						<Grid container spacing={3}>
							<Grid item xs={12} md={4}>
								<Paper className={classes.paper}>
									<h3>Already Members</h3>
									<FormGroup>
										{/* {currentProject.teamMembers.length > 0 &&
											currentProject.teamMembers.map((member, id) => (
												<AlreadyMemberCard key={id} memberData={member} />
											))} */}
										{currentProjectTeamMembers.length > 0 &&
											currentProjectTeamMembers.map((member, id) => (
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
											crntPrjTmMemIDs.length > 0 &&
											teamMembers.map(
												(member, id) =>
													crntPrjTmMemIDs.indexOf(member._id) === -1 && (
														<ReaminingMemberCard key={id} memberData={member} />
													)
											)}
									</FormGroup>
								</Paper>
							</Grid>
						</Grid>
					</div>
				</Dialog>
			</div>
			<div>
				<Dialog
					open={mngPrjSnglMemDlgOpen}
					onClose={() => setMngTeamMemDialog(false)}
					PaperComponent={PaperComponent}
					aria-labelledby='draggable-dialog-title'
				>
					<DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
						Manage Member
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To subscribe to this website, please enter your email address
							here. We will send updates occasionally. __{' '}
							{JSON.stringify(crntPrjCrntMemData)}
						</DialogContentText>
						<FormControl
							variant='standard'
							className={classes.formControl}
							fullWidth
						>
							<InputLabel htmlFor='user-type'>User Role</InputLabel>
							<NativeSelect
								value={userType && userType._id}
								onChange={onSelectUserType}
								id='user-type'
							>
								<option value='' />
								{userTypes.map((type, id) => (
									<UserTypesCard key={id} usrType={type} />
								))}
							</NativeSelect>
						</FormControl>
					</DialogContent>
					<DialogActions>
						<Button
							autoFocus
							onClick={() => setMngTeamMemDialog(false)}
							color='primary'
						>
							Cancel
						</Button>
						<Button onClick={onRemFrmProj} color='primary'>
							Delete Member
						</Button>
						<Button onClick={onChngMemRole} color='primary'>
							Change Role
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</Fragment>
	);
};

AddNewMember.propTypes = {
	auth: PropTypes.object.isRequired,
	team: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	showManageTeamDialog: PropTypes.func.isRequired,
	setAddMemberDialog: PropTypes.func.isRequired,
	getAllMembers: PropTypes.func.isRequired,
	getAllUserTypes: PropTypes.func.isRequired,
	addMemToCurrPrj: PropTypes.func.isRequired,
	setMngTeamMemDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	team: state.team,
	project: state.project
});

const mapDispatchToProps = {
	showManageTeamDialog,
	setAddMemberDialog,
	getAllMembers,
	getAllUserTypes,
	addMemToCurrPrj,
	setMngTeamMemDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewMember);
