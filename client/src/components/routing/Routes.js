import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import PrivateRoute from './PrivateRoutes';
import Home from '../Home';
import Register from '../Register';
import Dash from '../dash/Dash';
import Company from '../dash/Company';
import Team from '../dash/Team';
import Project from '../dash/Project';

const useStyles = makeStyles(theme=>({
    container: {
        marginTop: theme.spacing(0)
    }
}));

const Routes = () => {
    const classes = useStyles();

    return (
        <section className={ classes.container }>
            {/* <Alert /> */}
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
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