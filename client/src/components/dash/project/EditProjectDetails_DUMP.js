import { getAllUserTypes, updateMember } from '../../../actions/teamAction';
import {
	setEditProjectDialog,
	getAllProjectTypes
} from '../../../actions/projectAction';
import { getCompanyNames } from '../../../actions/companyAction';
import CompanyNamesCard from '../company/CompanyNamesCard';
import CompanyTypesCard from '../company/CompanyTypesCard';

export const EditProjectDetails = ({
	company: { companyToEdit, companyNames },
	team: { userTypes },
	project: { editProjectDialogOpen, projectToEdit },
	setEditProjectDialog,
	getAllUserTypes,
	getAllProjectTypes,
	updateMember
}) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [companyType, setCompanyType] = useState('');

	// useEffect(() => {
	// 	getCompanyNames();
	// }, [getCompanyNames]);

	// useEffect(() => {
	// 	getAllProjectTypes();
	// }, [getAllProjectTypes]);

	// useEffect(() => {
	// 	setFirstName(projectToEdit.firstName);
	// 	setLastName(projectToEdit.lastName);
	// 	setUserEmail(projectToEdit.userEmail);
	// 	setCompanyName(projectToEdit.companyName);
	// 	setCompanyType(projectToEdit.companyType);
	// }, [projectToEdit]);

	const onCompanyNameSelect = e => {
		const selectedUserType = {
			_id: e.target.value,
			companyName: e.target.options[e.target.selectedIndex].text
		};

		setCompanyName(selectedUserType);
	};

	const onCompanyTypeSelect = e => {
		const selectedCompanyType = {
			_id: e.target.value,
			companyType: e.target.options[e.target.selectedIndex].text
		};

		setCompanyType(selectedCompanyType);
	};

	const onReset = e => {
		e.preventDefault();

		setCompanyName({ _id: '' });
		setCompanyType({ _id: '' });
		setFirstName('');
		setLastName('');
		setUserEmail('');
	};

	const onSubmit = e => {
		e.preventDefault();

		const memberData = {
			_id: projectToEdit._id,
			companyName,
			companyType,
			firstName,
			lastName,
			userEmail
		};

		updateMember(memberData);
		onReset(e);
		setEditProjectDialog(false);
	};

	console.log(companyToEdit);

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
							autoFocus
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
						<InputLabel htmlFor='company-type'>Company Type</InputLabel>
						<NativeSelect
							value={companyType._id}
							onChange={onCompanyTypeSelect}
							id='company-type'
							tabIndex='2'
						>
							<option value='' />
							{companyTypes.map((type, id) => (
								<CompanyTypesCard key={id} compType={type} />
							))}
						</NativeSelect>
					</FormControl>
					<TextField
						value={firstName}
						onChange={e => setFirstName(e.target.value)}
						label='First Name'
						variant='outlined'
						fullWidth
						tabIndex='3'
					/>
					<TextField
						value={lastName}
						onChange={e => setLastName(e.target.value)}
						label='Last Name'
						variant='outlined'
						fullWidth
						tabIndex='4'
					/>
					<TextField
						value={userEmail}
						onChange={e => setUserEmail(e.target.value)}
						label='Email'
						variant='outlined'
						fullWidth
						tabIndex='5'
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
	team: PropTypes.object.isRequired,
	company: PropTypes.object.isRequired,
	project: PromiseRejectionEvent,
	setEditProjectDialog: PropTypes.func.isRequired,
	getCompanyNames: PropTypes.func.isRequired,
	getAllProjectTypes: PropTypes.func.isRequired,
	updateMember: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	project: state.project,
	team: state.team,
	company: state.company
});

const mapDispatchToProps = {
	setEditProjectDialog,
	getCompanyNames,
	getAllProjectTypes,
	updateMember
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectDetails);
