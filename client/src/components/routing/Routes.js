import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import PrivateRoute from './PrivateRoutes';
import SnackBar from '../layout/SnackBar';
import Login from '../pages/Login';
import HomePage from '../pages/HomePage';
import Register from '../pages/Register';
import ConfirmEmail from '../pages/ConfirmEmail';
import Profile from '../dash/Profile';
import Dash from '../dash/Dash';
import Company from '../dash/Company';
import Team from '../dash/Team';
import Project from '../dash/Project';

const useStyles = makeStyles(theme => ({
	container: {
		marginTop: theme.spacing(0)
	}
}));

const Routes = () => {
	const classes = useStyles();

	return (
		<section className={classes.container}>
			<SnackBar />
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route exact path='/login/:key' component={Login} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/confirmEmail' component={ConfirmEmail} />
				<PrivateRoute exact path='/profile' component={Profile} />
				<PrivateRoute exact path='/dash' component={Dash} />
				<PrivateRoute exact path='/companies' component={Company} />
				<PrivateRoute exact path='/team' component={Team} />
				<PrivateRoute exact path='/projects' component={Project} />
				{/* <PrivateRoute exact path='/posts/:id' component={Post} /> */}
				{/* <Route component={NotFound} /> */}
			</Switch>
		</section>
	);
};

export default Routes;
