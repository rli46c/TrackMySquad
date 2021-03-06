import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	makeStyles,
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Grid,
	Paper,
	Typography
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { Link, Redirect } from 'react-router-dom';
import { uuid } from 'uuidv4';
import Appbar from '../layout/Appbar';
import Footer from '../layout/Footer';
import { registerUser } from '../../actions/authAction';
import { showAlert } from '../../actions/layoutAction';
import Timetracker from '../../stock/img/timetracker.png';

const useStyles = makeStyles(theme => ({
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	image: {
		backgroundImage: `url(${Timetracker})`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.grey[900]
				: theme.palette.grey[50],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	paper: {
		margin: theme.spacing(4, 4, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},

	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	close: {
		padding: theme.spacing(0.5)
	}
}));

export const Register = ({ isRegistered, registerUser, showAlert }) => {
	const [userFullName, setUserFullName] = useState('');
	const [userCompany, setUserCompany] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [companyContact, setCompanyContact] = useState('');
	const [userPass, setUserPass] = useState('');
	const [confPass, setConfPass] = useState('');
	const [acceptTnC, setAcceptTnC] = useState(false);

	const onSubmit = e => {
		e.preventDefault();

		if (userPass === confPass && acceptTnC) {
			const userData = {
				userFullName,
				userCompany,
				userEmail,
				companyContact,
				userPass,
				acceptTnC
			};

			registerUser(userData);

			setUserFullName('');
			setUserCompany('');
			setUserEmail('');
			setUserPass('');
			setConfPass('');
			setAcceptTnC(false);
		} else {
			if (userPass !== confPass) {
				showAlert([{ id: uuid(), status: 400, msg: 'Passwords must match.' }]);
			} else {
				showAlert([
					{ id: uuid(), status: 400, msg: 'Accept terms and conditions.' }
				]);
			}
		}
	};

	const classes = useStyles();

	if (isRegistered) {
		return <Redirect to='/confirmEmail' />;
	}

	return (
		<Fragment>
			<CssBaseline />
			<Appbar />
			<Grid container component='main' className={classes.root}>
				<Grid item xs={false} sm={4} md={7} className={classes.image} />
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlined />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign Up
						</Typography>
						<form
							className={`${classes.form} signupform`}
							noValidate
							onSubmit={onSubmit}
						>
							<TextField
								value={userFullName}
								onChange={e => setUserFullName(e.target.value)}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								label='Admin Name'
								autoFocus
								autoComplete='fname'
							/>
							<TextField
								value={userCompany}
								onChange={e => setUserCompany(e.target.value)}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								label='Company Name'
								autoComplete='company'
							/>
							<TextField
								value={userEmail}
								onChange={e => setUserEmail(e.target.value)}
								variant='outlined'
								margin='normal'
								type='email'
								required
								fullWidth
								label='Email Address'
								autoComplete='email'
							/>
							<TextField
								value={companyContact}
								onChange={e => setCompanyContact(e.target.value)}
								variant='outlined'
								margin='normal'
								fullWidth
								label='Company Contact'
								autoComplete='phone'
							/>
							<TextField
								value={userPass}
								onChange={e => setUserPass(e.target.value)}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								label='Password'
								type='password'
								autoComplete='current-password'
							/>
							<TextField
								value={confPass}
								onChange={e => setConfPass(e.target.value)}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								label='Confirm Password'
								type='password'
								autoComplete='current-password'
							/>
							{/* <FormControlLabel
								control={
									<Checkbox
										value={acceptTnC}
										color='primary'
										onChange={() => setAcceptTnC(val => !val)}
									/>
								}
								label='I want to receive inspiration, marketing promotions and updates via email.'
							/> */}
							<span>Check</span>
							<Checkbox
								value={acceptTnC}
								color='primary'
								onChange={() => setAcceptTnC(val => !val)}
							/>
							<span>
								to agree TrackMySquad's{' '}
								<Link to='/termsConditions'>Terms of Use</Link>.
							</span>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
							>
								Sign Up
							</Button>
							<Grid container justify='flex-end'>
								<Grid item>
									<Link to='/login' variant='body2'>
										Already have an account? Sign in
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Grid>
			</Grid>
			<Footer />
		</Fragment>
	);
};

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	showAlert: PropTypes.func.isRequired,
	isRegistered: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isRegistered: state.auth.isRegistered
});

const mapDispatchToProps = {
	registerUser,
	showAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
