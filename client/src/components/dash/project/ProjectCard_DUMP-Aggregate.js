import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	makeStyles,
	TableRow,
	TableCell,
	IconButton,
	Button,
	Slide
} from '@material-ui/core';
import { Edit, DeleteForever, Cancel } from '@material-ui/icons';
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
	},
	pointer: {
		cursor: 'pointer'
	},
	rowToSlide: {
		zIndex: 1,
		position: 'relative',
		margin: theme.spacing(1)
	},
	deleteButton: {
		borderWidth: '2px',
		borderStyle: 'solid'
	},
	highlightText: {
		color: '#fff',
		fontWeight: 'bold'
	}
}));

export const ProjectCard = ({
	auth: {
		user: { _id: userId }
	},
	projectData,
	deleteProject,
	getAllProjects,
	setManageTeamList,
	setProjectToEdit
}) => {
	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		setChecked(prev => !prev);
	};

	useEffect(() => {
		getAllProjects();
	}, [getAllProjects]);

	const onEdit = (projectId, projectName, projectTypeID, companyID) => {
		setProjectToEdit({
			projectId,
			projectName,
			projectTypeID,
			companyID
		});
	};

	const onDelete = projectId => {
		handleChange();
		deleteProject(projectId);
	};

	const classes = useStyles();
	// console.log('userrr', teamusers);
	console.log(projectData);

	return (
		projectData.projectDetails.length > 0 &&
		projectData.projectDetails.map(projectDetail => (
			<Fragment>
				<TableRow style={checked ? { backgroundColor: '#ff0000' } : null}>
					<TableCell
						className={checked ? classes.highlightText : classes.tableCell}
					>
						{projectDetail.projectName}
					</TableCell>
					<TableCell
						className={checked ? classes.highlightText : classes.tableCell}
					>
						{projectDetail.projectTypeID.projectType}
					</TableCell>
					<TableCell className={checked ? classes.highlightText : null}>
						{projectData.companyName}
					</TableCell>
					<TableCell
						onClick={() => setManageTeamList(true, projectDetail._id, userId)}
						aria-label='add'
						className={classes.pointer}
					>
						<span className={checked ? classes.highlightText : null}>
							Members Here
						</span>
					</TableCell>
				</TableRow>
				<TableCell align='right'>
					<input type='button' id='edit-project' style={{ display: 'none' }} />
					<label
						htmlFor='edit-project'
						onClick={
							!checked
								? onEdit(
										projectDetail._id,
										projectDetail.projectName,
										projectDetail.projectTypeID,
										{
											_id: projectData._id,
											companyName: projectData.companyName
										}
								  )
								: null
						}
					>
						<IconButton
							color={checked ? 'default' : 'primary'}
							aria-label='Edit Project'
							component='span'
						>
							<Edit />
						</IconButton>
					</label>
				</TableCell>
				<TableCell align='right'>
					<input
						type='button'
						id='delete-project'
						style={{ display: 'none' }}
					/>
					<label htmlFor='delete-project' onClick={handleChange}>
						<IconButton
							color={checked ? 'inherit' : 'primary'}
							aria-label='Delete Profile'
							component='span'
						>
							{checked ? <Cancel /> : <DeleteForever />}
						</IconButton>
					</label>
				</TableCell>
				<Slide direction='left' in={checked} mountOnEnter unmountOnExit>
					<TableRow elevation={4} className={classes.rowToSlide}>
						<TableCell colSpan='5'>
							<span>Are you sure you want to delete? &nbsp; </span>
							<Button
								className={classes.deleteButton}
								onClick={onDelete(projectDetail._id)}
								color='secondary'
							>
								Delete
							</Button>
							<Button color='primary' onClick={handleChange}>
								Cancel
							</Button>
						</TableCell>
					</TableRow>
				</Slide>
			</Fragment>
		))
	);
};

ProjectCard.propTypes = {
	projectData: PropTypes.object.isRequired,
	deleteProject: PropTypes.func.isRequired,
	setProjectToEdit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

const mapDispatchToProps = {
	getAllProjects,
	deleteProject,
	setProjectToEdit,
	setManageTeamList
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
