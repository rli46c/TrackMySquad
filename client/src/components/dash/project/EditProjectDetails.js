import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Close } from '@material-ui/icons';
import {
	makeStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
	FormControl,
	InputLabel,
	NativeSelect,
	Button,
	TextField
} from '@material-ui/core';

import { getCompanyNames } from '../../../actions/companyAction';
import CompanyNamesCard from '../company/CompanyNamesCard';
import {
	getAllProjectTypes,
	setEditProjectDialog,
	updateProject
} from '../../../actions/projectAction';
import ProjectTypesCard from './ProjectTypesCard';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
			//   width: '100%',
		},
		marginRight: theme.spacing(2)
	},
	dialogTitle: {
		textAlign: 'right'
	},
	spanTitle: {},
	spanGap: {
		padding: '0px 30%'
	},
	times: {
		color: '#555'
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export const EditProjectDetails = ({
	auth: {
		user: { _id: currentUser }
	},
	project: { projectToEdit, projectTypes, editProjectDialogOpen },
	company: { companyNames },
	getCompanyNames,
	getAllProjectTypes,
	setEditProjectDialog,
	updateProject
}) => {
	const [fullWidth] = useState(true);
	const [maxWidth] = useState('sm');

	const [projectName, setProjectName] = useState('');
	const [projectType, setProjectType] = useState('');
	const [companyName, setCompanyName] = useState('');

	useEffect(() => {
		getCompanyNames(currentUser);
	}, [currentUser, getCompanyNames]);

	useEffect(() => {
		getAllProjectTypes();
	}, [getAllProjectTypes]);

	useEffect(() => {
		const { projectName, projectTypeID, companyID } = projectToEdit;
		setProjectName(projectName);
		setProjectType(projectTypeID);
		setCompanyName(companyID);
	}, [projectToEdit]);

	const onCompanyNameSelect = e => {
		const selectedCompany = {
			_id: e.target.value,
			companyName: e.target.options[e.target.selectedIndex].text
		};

		setCompanyName(selectedCompany);
	};
	const onProjectTypeSelect = e => {
		const selectedProjectType = {
			_id: e.target.value,
			projectType: e.target.options[e.target.selectedIndex].text
		};

		setProjectType(selectedProjectType);
	};

	const onReset = e => {
		e.preventDefault();

		setProjectType({ _id: '' });
		setCompanyName({ _id: '' });
		setProjectName('');
	};

	const onSubmit = e => {
		e.preventDefault();

		const projectData = {
			_id: projectToEdit._id,
			projectName,
			projectType,
			companyName
		};

		updateProject(projectData);
		onReset(e);
		setEditProjectDialog(false);
	};

	const classes = useStyles();

	return (
		<Dialog
			keepMounted
			disableBackdropClick
			onClose={() => setEditProjectDialog(false)}
			open={editProjectDialogOpen}
			TransitionComponent={Transition}
			fullWidth={fullWidth}
			maxWidth={maxWidth}
			aria-labelledby='edit-project-details'
			aria-describedby='edit-project-modal'
		>
			<DialogTitle className={classes.dialogTitle} id='edit-project-details'>
				<span className={classes.spanTitle}>Edit Project Details</span>
				<span className={classes.spanGap}>&nbsp;</span>
				<Close
					className={classes.times}
					onClick={() => setEditProjectDialog(false)}
				/>
			</DialogTitle>
			<DialogContent>
				<form
					className={classes.root}
					noValidate
					autoComplete='off'
					onSubmit={onSubmit}
					onKeyPress={e => {
						e.key === 'Enter' && e.preventDefault();
					}}
					id='edit-project-modal'
				>
					<FormControl
						variant='standard'
						className={classes.formControl}
						fullWidth
					>
						<InputLabel htmlFor='company-name'>Company Name</InputLabel>
						<NativeSelect
							value={companyName._id}
							onChange={onCompanyNameSelect}
							id='company-name'
							tabIndex='1'
						>
							<option value='' />
							{companyNames.map((company, id) => (
								<CompanyNamesCard key={id} compName={company} />
							))}
						</NativeSelect>
					</FormControl>

					<FormControl
						variant='standard'
						className={classes.formControl}
						fullWidth
					>
						<InputLabel htmlFor='project-type'>Project Type</InputLabel>
						<NativeSelect
							value={projectType._id}
							onChange={onProjectTypeSelect}
							id='project-type'
							tabIndex='2'
						>
							<option value='' />
							{projectTypes.map((project, id) => (
								<ProjectTypesCard key={id} prjType={project} />
							))}
						</NativeSelect>
					</FormControl>

					<TextField
						value={projectName}
						onChange={e => setProjectName(e.target.value)}
						label='Project Name'
						variant='outlined'
						fullWidth
						tabIndex='3'
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onReset} color='primary' tabIndex='-1'>
					Reset
				</Button>
				<Button
					onClick={onSubmit}
					color='secondary'
					variant='contained'
					tabIndex='0'
				>
					Update Details
				</Button>
			</DialogActions>
		</Dialog>
	);
};

EditProjectDetails.propTypes = {
	auth: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	getAllProjectTypes: PropTypes.func.isRequired,
	setEditProjectDialog: PropTypes.func.isRequired,
	updateProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	project: state.project,
	company: state.company
});

const mapDispatchToProps = {
	getCompanyNames,
	getAllProjectTypes,
	setEditProjectDialog,
	updateProject
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectDetails);
