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

import {
	setAddCompanyDialog,
	getAllCompanyTypes,
	addCompany
} from '../../../actions/companyAction';
import CompanyTypesCard from './CompanyTypesCard';

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
		padding: '0px 25%'
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

export const AddNewCompany = ({
	auth: { user },
	company: { addCompanyDialogOpen, companyTypes },
	setAddCompanyDialog,
	getAllCompanyTypes,
	addCompany
}) => {
	const [fullWidth] = useState(true);
	const [maxWidth] = useState('sm');

	const [name, setName] = useState('');
	const [companyType, setCompanyType] = useState('');
	const [adrs, setAdrs] = useState('');

	useEffect(() => {
		getAllCompanyTypes();
	}, [getAllCompanyTypes]);

	const onReset = e => {
		e.preventDefault();
		setName('');
		setCompanyType('');
		setAdrs('');
	};

	const onSubmit = e => {
		e.preventDefault();

		const companyData = { user, name, companyType, adrs };
		addCompany(companyData);
		onReset(e);
		setAddCompanyDialog(false);
	};

	const classes = useStyles();

	return (
		<Dialog
			keepMounted
			disableBackdropClick
			onClose={() => setAddCompanyDialog(false)}
			open={addCompanyDialogOpen}
			TransitionComponent={Transition}
			fullWidth={fullWidth}
			maxWidth={maxWidth}
			aria-labelledby='add-company-profile'
			aria-describedby='add-company-modal'
		>
			<DialogTitle className={classes.dialogTitle} id='add-company-profile'>
				<span className={classes.spanTitle}>Add New Company Profile</span>
				<span className={classes.spanGap}>&nbsp;</span>
				<Close
					className={classes.times}
					onClick={() => setAddCompanyDialog(false)}
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
					id='add-company-modal'
				>
					<FormControl
						variant='standard'
						className={classes.formControl}
						fullWidth
					>
						<InputLabel htmlFor='company-type'>Company Type</InputLabel>
						<NativeSelect
							value={companyType}
							onChange={e => setCompanyType(e.target.value)}
							id='company-type'
						>
							<option value='' />
							{companyTypes.map((type, id) => (
								<CompanyTypesCard key={id} compType={type} />
							))}
						</NativeSelect>
					</FormControl>
					{/* <TextField value={ type } onChange={ (e)=>setType(e.target.value) } label="Type" variant="outlined" fullWidth tabIndex="2" /> */}
					<TextField
						value={name}
						onChange={e => setName(e.target.value)}
						label='Name'
						variant='outlined'
						fullWidth
						tabIndex='1'
					/>
					<TextField
						value={adrs}
						onChange={e => setAdrs(e.target.value)}
						label='Address'
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
					Add Profile
				</Button>
			</DialogActions>
		</Dialog>
	);
};

AddNewCompany.propTypes = {
	auth: PropTypes.object.isRequired,
	company: PropTypes.object.isRequired,
	setAddCompanyDialog: PropTypes.func.isRequired,
	getAllCompanyTypes: PropTypes.func.isRequired,
	addCompany: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	company: state.company
});

const mapDispatchToProps = {
	setAddCompanyDialog,
	getAllCompanyTypes,
	addCompany
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCompany);
