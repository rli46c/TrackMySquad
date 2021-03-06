import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import store from './store';
import '../src/stock/css/app.css';

import setAuthToken from './utils/setAuthToken';
import Routes from './components/routing/Routes';
import HomePage from './components//pages/HomePage';
import { loadUser } from './actions/authAction';
// import color from '@material-ui/core/colors/amber';

const useStyle = makeStyles(theme => ({
	bgcolor: {
		background: '#151515'
	}
}));

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	const classes = useStyle();
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store} className={classes.bgcolor}>
			<SnackbarProvider
				maxSnack={3}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Router className={classes.bgcolor}>
					<CssBaseline />
					<Switch>
						<Route exact path='/' component={HomePage} />
						<Route component={Routes} />
					</Switch>
				</Router>
			</SnackbarProvider>
		</Provider>
	);
};

export default App;
