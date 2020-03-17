import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	makeStyles,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Link,
	Fab
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { getAllMembers, setAddMemberDialog } from '../../../actions/teamAction';
import { getAllProjects } from '../../../actions/projectAction';
import MemberCard from './MemberCard';
import AddNewMember from './AddNewMember';
import EditMemberDetails from './EditMemberDetails';
import ManageProjectList from '../project/ManageProjectList';

const useStyles = makeStyles(theme => ({
	seeMore: {
		marginTop: theme.spacing(3)
	},
	addMemberIcon: {
		position: 'fixed',
		right: theme.spacing(3),
		bottom: theme.spacing(3)
	}
}));

export const MembersList = ({
	auth: {
		user: { _id: currentUser }
	},
	team: {
		teamMembers,
		projectNamelist,
		addMemberDialogOpen,
		memberToEdit,
		teamErrors
	},
	project: { projects, manageProjectDialogOpen },
	getAllMembers,
	getAllProjects,
	setAddMemberDialog
}) => {
	useEffect(() => {
		getAllMembers(currentUser);
	}, [currentUser, getAllMembers]);

	useEffect(() => {
		if (projects.length === 0) {
			getAllProjects(currentUser);
		}
	}, [projects.length, currentUser, getAllProjects]);

	const classes = useStyles();
	console.log('manageProjectDialogOpen', manageProjectDialogOpen);

	return (
		<Fragment>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>First Name</TableCell>
						<TableCell>Last Name</TableCell>
						<TableCell>User Type</TableCell>
						<TableCell>Project Name</TableCell>
						<TableCell>User Email</TableCell>
						<TableCell align='center' colSpan='2'>
							Actions
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{teamMembers.length >= 0 &&
						teamMembers.map((member, id) => (
							<MemberCard
								key={id}
								memberData={member}
								allProjectsData={{ projects }}
							/>
						))}
				</TableBody>
			</Table>

			<div className={classes.seeMore}>
				<Link color='primary' href='#'>
					See more members
				</Link>
			</div>

			<Fab
				className={classes.addMemberIcon}
				onClick={() => setAddMemberDialog(true)}
				color='primary'
				aria-label='add'
			>
				<Add />
			</Fab>
			{manageProjectDialogOpen && <ManageProjectList />}
			{addMemberDialogOpen && <AddNewMember />}
			{Object.entries(memberToEdit).length !== 0 && <EditMemberDetails />}
		</Fragment>
	);
};

MembersList.propTypes = {
	auth: PropTypes.object.isRequired,
	team: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	getAllMembers: PropTypes.func.isRequired,
	getAllProjects: PropTypes.func.isRequired,
	setAddMemberDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	team: state.team,
	project: state.project
});

const mapDispatchToProps = {
	getAllMembers,
	getAllProjects,
	setAddMemberDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersList);
