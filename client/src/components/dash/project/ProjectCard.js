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

import {
	deleteProject,
	getAllProjects,
	setProjectToEdit,
	setCurrentProject,
	showManageTeamDialog
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
	},
	linkText: {
		color: '#0000ff',
		textDecoration: 'underline'
	}
}));

export const ProjectCard = ({
	projectData,
	deleteProject,
	getAllProjects,
	showManageTeamDialog,
	setProjectToEdit,
	setCurrentProject
}) => {
	const [checked, setChecked] = useState(false);

	const { _id: projId, projectName, projectTypeID, companyID } = projectData;

	useEffect(() => {
		getAllProjects();
	}, [getAllProjects]);

	const handleChange = () => {
		setChecked(prev => !prev);
	};

	const manageMembers = () => {
		setCurrentProject(projectData);
		showManageTeamDialog(true);
	};

	const onEdit = () => {
		setProjectToEdit({
			projId,
			projectName,
			projectTypeID,
			companyID
		});
	};

	const onDelete = () => {
		handleChange();
		deleteProject();
	};

	const classes = useStyles();

	return (
		<Fragment>
			<TableRow style={checked ? { backgroundColor: '#ff0000' } : null}>
				<TableCell
					className={checked ? classes.highlightText : classes.tableCell}
				>
					{projectName}
				</TableCell>
				<TableCell
					className={checked ? classes.highlightText : classes.tableCell}
				>
					{projectTypeID.projectType}
				</TableCell>
				<TableCell className={checked ? classes.highlightText : null}>
					{companyID.companyName}
				</TableCell>
				<TableCell
					onClick={manageMembers}
					aria-label='add'
					className={classes.pointer}
				>
					<span className={checked ? classes.highlightText : null}>
						<span className={classes.linkText}>[ Manage Members... ]</span>
					</span>
				</TableCell>
				<TableCell align='right'>
					<input type='button' id='edit-project' style={{ display: 'none' }} />
					<label htmlFor='edit-project' onClick={!checked ? onEdit : null}>
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
			</TableRow>
			<Slide direction='left' in={checked} mountOnEnter unmountOnExit>
				<TableRow elevation={4} className={classes.rowToSlide}>
					<TableCell colSpan='5'>
						<span>Are you sure you want to delete? &nbsp; </span>
						<Button
							className={classes.deleteButton}
							onClick={onDelete}
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
	);
};

ProjectCard.propTypes = {
	projectData: PropTypes.object.isRequired,
	deleteProject: PropTypes.func.isRequired,
	setProjectToEdit: PropTypes.func.isRequired,
	setCurrentProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

const mapDispatchToProps = {
	getAllProjects,
	deleteProject,
	setProjectToEdit,
	setCurrentProject,
	showManageTeamDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
