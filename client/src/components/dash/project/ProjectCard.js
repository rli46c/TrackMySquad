import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, TableRow, TableCell, IconButton } from '@material-ui/core';
import { Edit, DeleteForever } from '@material-ui/icons';

import {
	deleteProject,
	setProjectToEdit
} from '../../../actions/projectAction';

const useStyles = makeStyles(theme => ({
	tableCell: {
		whiteSpace: 'normal',
		wordWrap: 'break-word'
	}
}));

export const ProjectCard = ({
	projectData: { projectName, projectTypeID, companyID },
	deleteProject,
	setProjectToEdit
}) => {
	const onEdit = () => {
		setProjectToEdit({
			// _id,
			// firstName,
			// lastName,
			// userType,
			// companyType,
			// userEmail
		});
	};

	const onDelete = () => {
		// deleteProject(_id);
	};

	const classes = useStyles();

	return (
		<TableRow>
			<TableCell className={classes.tableCell}>{projectName}</TableCell>
			<TableCell className={classes.tableCell}>
				{projectTypeID.projectType}
			</TableCell>
			<TableCell>{companyID.companyName}</TableCell>
			<TableCell>Members Here</TableCell>
			<TableCell align='right'>
				<input
					type='button'
					id='edit-member-profile'
					style={{ display: 'none' }}
				/>
				<label htmlFor='edit-member-profile' onClick={onEdit}>
					<IconButton
						color='primary'
						aria-label='Edit Profile'
						component='span'
					>
						<Edit />
					</IconButton>
				</label>
			</TableCell>
			<TableCell align='right'>
				<input
					type='button'
					id='delete-member-profile'
					style={{ display: 'none' }}
				/>
				<label htmlFor='delete-member-profile' onClick={onDelete}>
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
	deleteProject: PropTypes.func.isRequired,
	setProjectToEdit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	deleteProject,
	setProjectToEdit
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
