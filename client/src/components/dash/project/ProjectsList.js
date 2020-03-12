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

import {
	getAllProjects,
	setAddProjectDialog
} from '../../../actions/projectAction';
import ProjectCard from './ProjectCard';
import AddNewProject from './AddNewProject';
import ManageTeamMembers from '../team/ManageTeamMembers';
import EditProjectDetails from './EditProjectDetails';
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

export const ProjectsList = ({
	auth: {
		user: { _id: currentUser }
	},
	project: { projects, projectToEdit, addProjectDialogOpen, projectErrors },
	team: { manageMembersDialogOpen },
	getAllProjects,
	setAddProjectDialog
}) => {
	useEffect(() => {
		getAllProjects(currentUser);
	}, [currentUser, getAllProjects]);

	const classes = useStyles();

	return (
		<Fragment>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>Project Name</TableCell>
						<TableCell>Project Type</TableCell>
						<TableCell>Company Name</TableCell>
						<TableCell>Team Members</TableCell>
						<TableCell align='center' colSpan='2'>
							Actions
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{projects.map((prj, id) => (
						<ProjectCard key={id} projectData={prj} />
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
				onClick={() => setAddProjectDialog(true)}
				color='primary'
				aria-label='add'
			>
				<Add />
			</Fab>
			{addProjectDialogOpen && <AddNewProject />}
			{Object.entries(projectToEdit).length !== 0 && <EditProjectDetails />}
			{manageMembersDialogOpen && <ManageTeamMembers />}
		</Fragment>
	);
};

ProjectsList.propTypes = {
	auth: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	team: PropTypes.object.isRequired,
	getAllProjects: PropTypes.func.isRequired,
	setAddProjectDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	project: state.project,
	team: state.team
});

const mapDispatchToProps = {
	getAllProjects,
	setAddProjectDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
