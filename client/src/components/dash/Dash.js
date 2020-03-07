import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dashboard from './dashboard/Dashboard';

export const Dash = () => {
	useEffect(() => {
		if (localStorage.currentModule) {
			localStorage.setItem('currentModule', 'dash');
		}
	}, []);
	return <Dashboard />;
};

Dash.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dash);
