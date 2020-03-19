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

	const [companyName, setCompanyName] = useState('');
	const [companyType, setCompanyType] = useState('');
	const [companyContact, setCompanyContact] = useState('');
	const [address1, setAddress1] = useState('');
	const [address2, setAddress2] = useState('');
	const [companyStreet, setCompanyStreet] = useState('');
	const [companyCity, setCompanyCity] = useState('');
	const [companyCountry, setCompanyCountry] = useState('');
	const [companyZip, setCompanyZip] = useState('');

	useEffect(() => {
		getAllCompanyTypes();
	}, [getAllCompanyTypes]);

	const onReset = e => {
		e.preventDefault();
		setCompanyName('');
		setCompanyType('');
		setCompanyContact('');
		setAddress1('');
		setAddress2('');
		setCompanyStreet('');
		setCompanyCity('');
		setCompanyCountry('');
		setCompanyZip('');
	};

	const onSubmit = e => {
		e.preventDefault();

		const companyData = {
			user,
			companyName,
			companyType,
			companyContact,
			address1,
			address2,
			companyStreet,
			companyCity,
			companyCountry,
			companyZip
		};
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
							<option value='' tabIndex='1' />
							{companyTypes.map((type, id) => (
								<CompanyTypesCard key={id} compType={type} />
							))}
						</NativeSelect>
					</FormControl>
					<TextField
						value={companyName}
						onChange={e => setCompanyName(e.target.value)}
						label='Name'
						variant='outlined'
						fullWidth
						tabIndex='2'
					/>
					<TextField
						value={companyContact}
						onChange={e => setCompanyContact(e.target.value)}
						label='Phone'
						variant='outlined'
						fullWidth
						tabIndex='3'
					/>
					<TextField
						value={address1}
						onChange={e => setAddress1(e.target.value)}
						label='Address 1'
						variant='outlined'
						fullWidth
						tabIndex='4'
					/>
					<TextField
						value={address2}
						onChange={e => setAddress2(e.target.value)}
						label='Address 2'
						variant='outlined'
						fullWidth
						tabIndex='5'
					/>
					<TextField
						value={companyStreet}
						onChange={e => setCompanyStreet(e.target.value)}
						label='Street'
						variant='outlined'
						fullWidth
						tabIndex='6'
					/>
					<TextField
						value={companyCity}
						onChange={e => setCompanyCity(e.target.value)}
						label='Ciry'
						variant='outlined'
						fullWidth
						tabIndex='7'
					/>
					<TextField
						value={companyCountry}
						onChange={e => setCompanyCountry(e.target.value)}
						label='Country'
						variant='outlined'
						fullWidth
						tabIndex='8'
					/>
					<TextField
						value={companyZip}
						onChange={e => setCompanyZip(e.target.value)}
						label='Zip Code'
						variant='outlined'
						fullWidth
						tabIndex='9'
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
