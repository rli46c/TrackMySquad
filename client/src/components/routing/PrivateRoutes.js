import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoutes = ({
	component: Component,
	auth: { isAuthenticated, loading },
	...rest
}) => (
	<Route
		{...rest}
		render={props =>
			// !isAuthenticated && !loading ? (
			// 	<Redirect to='/' />
			// ) : (
			// 	<Component {...props} />
			// )

			!isAuthenticated ? <Redirect to='/' /> : <Component {...props} />
		}
	/>
);

PrivateRoutes.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes);
