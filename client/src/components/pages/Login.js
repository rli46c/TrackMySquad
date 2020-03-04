import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link, useParams } from 'react-router-dom';
import {
	makeStyles,
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Paper,
	Box,
	Grid,
	Typography
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

import Appbar from '../layout/Appbar';
import Footer from '../layout/Footer';
import { loginUser } from '../../actions/authAction';

function GetKey() {
	let { key } = useParams();
	return key;
}

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
	//root: {
	//	height: '100vh'
	//},
	image: {
		backgroundImage:
			'url(https://source.unsplash.com/random/?time,clock,watch,tracker)',
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
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	close: {
		padding: theme.spacing(0.5)
	}
}));

export const Login = ({ loginUser, isAuthenticated }) => {
	const [un, setUn] = useState('');
	const [up, setUp] = useState('');
	const [keyVal] = useState(GetKey());

	const onSubmit = e => {
		e.preventDefault();

		const userdata = { un, up };

		if (keyVal || typeof keyVal !== 'undefined') {
			userdata.keyVal = keyVal;
		}

		loginUser(userdata);
	};

	const classes = useStyles();

	if (isAuthenticated) {
		return <Redirect to='/dash' />;
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
							Sign in
						</Typography>
						<form
							onSubmit={onSubmit}
							className={`${classes.form} signupform`}
							noValidate
						>
							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								id='un'
								label='Username'
								name='un'
								autoComplete='Username'
								autoFocus
								value={un}
								onChange={e => setUn(e.target.value)}
							/>

							<TextField
								variant='outlined'
								margin='normal'
								required
								fullWidth
								name='up'
								label='Password'
								type='password'
								id='up'
								autoComplete='current-password'
								value={up}
								onChange={e => setUp(e.target.value)}
							/>

							<FormControlLabel
								control={<Checkbox value='remember' color='primary' />}
								label='Remember me'
							/>

							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
							>
								Sign In
							</Button>

							<Grid container>
								<Grid item xs>
									<Link to='!#' variant='body2'>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link to='/register' variant='body2'>
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
							<Box mt={5}>
								<Copyright />
							</Box>
						</form>
					</div>
				</Grid>
			</Grid>
			<Footer />
		</Fragment>
	);
};

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
	loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
