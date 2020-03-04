import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { Close } from '@material-ui/icons';

import { addProject } from '../../../actions/projectAction';
import { getCompanyNames } from '../../../actions/companyAction';
import {
	setAddProjectDialog,
	getAllProjectTypes
} from '../../../actions/projectAction';
import CompanyNamesCard from '../company/CompanyNamesCard';
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
		padding: '0px 15%'
	},
	times: {
		color: '#555'
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export const AddNewProject = ({
	team: { userTypes },
	project: { addProjectDialogOpen, projectTypes },
	company: { companyNames },
	getCompanyNames,
	getAllProjectTypes,
	setAddProjectDialog,
	addProject
}) => {
	const [fullWidth] = useState(true);
	const [maxWidth] = useState('sm');

	const [companyName, setCompanyName] = useState('');
	const [projectType, setProjectType] = useState('');
	const [projectName, setProjectName] = useState('');

	useEffect(() => {
		getCompanyNames();
	}, [getCompanyNames]);

	useEffect(() => {
		getAllProjectTypes();
	}, [getAllProjectTypes]);

	const onSelectProjectType = e => {
		setProjectType({
			_id: e.target.value,
			projectType: e.target.options[e.target.selectedIndex].text
		});
	};

	const onSelectCompanyName = e => {
		setCompanyName({
			_id: e.target.value,
			companyName: e.target.options[e.target.selectedIndex].text
		});
	};

	const onReset = e => {
		e.preventDefault();
		setProjectName('');
		setProjectType('');
		setCompanyName('');
	};

	const onSubmit = e => {
		e.preventDefault();

		const projectData = {
			projectName,
			projectType,
			companyName
		};

		addProject(projectData);
		onReset(e);
		setAddProjectDialog(false);
	};

	const classes = useStyles();

	return (
		<Dialog
			keepMounted
			disableBackdropClick
			onClose={() => setAddProjectDialog(false)}
			open={addProjectDialogOpen}
			TransitionComponent={Transition}
			fullWidth={fullWidth}
			maxWidth={maxWidth}
			aria-labelledby='add-project-profile'
			aria-describedby='add-project-modal'
		>
			<DialogTitle className={classes.dialogTitle} id='add-project-profile'>
				<span className={classes.spanTitle}>Add New Project</span>
				<span className={classes.spanGap}>&nbsp;</span>
				<Close
					className={classes.times}
					onClick={() => setAddProjectDialog(false)}
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
					id='add-project-modal'
				>
					<FormControl
						variant='standard'
						className={classes.formControl}
						fullWidth
					>
						<InputLabel htmlFor='company-names'>Company</InputLabel>
						<NativeSelect
							value={companyNames._id}
							onChange={onSelectCompanyName}
							id='company-names'
						>
							<option value='' />
							{companyNames.map((name, id) => (
								<CompanyNamesCard key={id} compName={name} />
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
							onChange={onSelectProjectType}
							id='project-type'
						>
							<option value='' />
							{projectTypes.map((type, id) => (
								<ProjectTypesCard key={id} prjType={type} />
							))}
						</NativeSelect>
					</FormControl>
					{/* <TextField value={ projectType } onChange={ (e)=>setProjectType(e.target.value) } label="User Type" variant="outlined" fullWidth tabIndex="2" /> */}
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
					Add Project
				</Button>
			</DialogActions>
		</Dialog>
	);
};

AddNewProject.propTypes = {
	team: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	company: PropTypes.object.isRequired,
	setAddProjectDialog: PropTypes.func.isRequired,
	addProject: PropTypes.func.isRequired,
	getCompanyNames: PropTypes.func.isRequired,
	getAllProjectTypes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	team: state.team,
	project: state.project,
	company: state.company
});

const mapDispatchToProps = {
	setAddProjectDialog,
	addProject,
	getCompanyNames,
	getAllProjectTypes
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewProject);
