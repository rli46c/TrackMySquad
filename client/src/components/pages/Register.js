import React, { useState } from 'react';
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
	Box,
	Typography,
	Container
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { Link, Redirect } from 'react-router-dom';
import { uuid } from 'uuidv4';

import { registerUser } from '../../actions/authAction';
import { showAlert } from '../../actions/layoutAction';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' to='https://material-ui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
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
		// <div style={{ border: '2px solid red' }}>

		<Container component='main' maxWidth='xs'>
			<CssBaseline />

			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<form className={classes.form} noValidate onSubmit={onSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								value={firstName}
								onChange={e => setFirstName(e.target.value)}
								variant='outlined'
								required
								fullWidth
								label='First Name'
								autoFocus
								autoComplete='fname'
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								value={lastName}
								onChange={e => setLastName(e.target.value)}
								variant='outlined'
								required
								fullWidth
								label='Last Name'
								autoComplete='lname'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								value={userCompany}
								onChange={e => setUserCompany(e.target.value)}
								variant='outlined'
								required
								fullWidth
								label='Company Name'
								autoComplete='company'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								value={userEmail}
								onChange={e => setUserEmail(e.target.value)}
								variant='outlined'
								required
								fullWidth
								label='Email Address'
								autoComplete='email'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								value={userPass}
								onChange={e => setUserPass(e.target.value)}
								variant='outlined'
								required
								fullWidth
								label='Password'
								type='password'
								autoComplete='current-password'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								value={confPass}
								onChange={e => setConfPass(e.target.value)}
								variant='outlined'
								required
								fullWidth
								label='Confirm Password'
								type='password'
								autoComplete='current-password'
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value='allowExtraEmails' color='primary' />}
								label='I want to receive inspiration, marketing promotions and updates via email.'
							/>
						</Grid>
					</Grid>
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
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>

		// </div>
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
