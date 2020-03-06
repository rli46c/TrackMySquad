import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, TableRow, TableCell, IconButton } from '@material-ui/core';
import { Edit, DeleteForever } from '@material-ui/icons';
import { setManageTeamList } from '../../../actions/teamAction';

import {
	deleteProject,
	getAllProjects,
	setProjectToEdit
} from '../../../actions/projectAction';

const useStyles = makeStyles(theme => ({
	tableCell: {
		whiteSpace: 'normal',
		wordWrap: 'break-word'
	}
}));

export const ProjectCard = ({
	projectData: { _id, projectName, projectTypeID, companyID },
	// usermember: { teamusers },
	deleteProject,
	getAllProjects,
	setProjectToEdit
}) => {
	useEffect(() => {
		getAllProjects();
	}, [getAllProjects]);

	const onEdit = () => {
		setProjectToEdit({
			_id,
			projectName,
			projectTypeID,
			companyID
		});
	};

	const onDelete = () => {
		deleteProject(_id);
	};

	const classes = useStyles();
	// console.log('userrr', teamusers);

	return (
		<TableRow>
			<TableCell className={classes.tableCell}>{projectName}</TableCell>
			<TableCell className={classes.tableCell}>
				{projectTypeID.projectType}
			</TableCell>
			<TableCell>{companyID.companyName}</TableCell>
			<TableCell>Members Here</TableCell>
			<TableCell align='right'>
				<input type='button' id='edit-project' style={{ display: 'none' }} />
				<label htmlFor='edit-project' onClick={onEdit}>
					<IconButton
						color='primary'
						aria-label='Edit Project'
						component='span'
					>
						<Edit />
					</IconButton>
				</label>
			</TableCell>
			<TableCell align='right'>
				<input type='button' id='delete-project' style={{ display: 'none' }} />
				<label htmlFor='delete-project' onClick={onDelete}>
					<IconButton
						color='primary'
						aria-label='Delete Profile'
						component='span'
					>
						<DeleteForever />
					</IconButton>
				</label>
			</TableCell>
		</TableRow>
	);
};

ProjectCard.propTypes = {
	projectData: PropTypes.object.isRequired,
	usermember: PropTypes.object.isRequired,
	deleteProject: PropTypes.func.isRequired,
	setProjectToEdit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	usermember: state.usermember
});

const mapDispatchToProps = {
	getAllProjects,
	deleteProject,
	setProjectToEdit
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
