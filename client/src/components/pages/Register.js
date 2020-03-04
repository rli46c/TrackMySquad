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
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [userCompany, setUserCompany] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPass, setUserPass] = useState('');
	const [confPass, setConfPass] = useState('');

	const onSubmit = e => {
		e.preventDefault();

		if (userPass === confPass) {
			const userData = {
				firstName,
				lastName,
				userCompany,
				userEmail,
				userPass
			};

			registerUser(userData);

			// setFirstName('');
			// setLastName('');
			// setUserCompany('');
			// setUserEmail('');
			// setUserPass('');
			// setConfPass('');
		} else {
			showAlert([{ id: uuid(), status: 400, msg: 'Passwords must match.' }]);
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
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								label='First Name'
								autoFocus
								autoComplete='fname'
							/>

							<TextField
								value={lastName}
								onChange={e => setLastName(e.target.value)}
								variant='outlined'
								margin='normal'
								required
								fullWidth
								label='Last Name'
								autoComplete='lname'
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
								required
								fullWidth
								label='Email Address'
								autoComplete='email'
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

							<FormControlLabel
								control={<Checkbox value='allowExtraEmails' color='primary' />}
								label='I want to receive inspiration, marketing promotions and updates via email.'
							/>
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
