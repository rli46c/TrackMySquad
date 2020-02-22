import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';
import Routes from './components/routing/Routes';
import Home from './components/Home';
import { loadUser } from './actions/authAction';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;