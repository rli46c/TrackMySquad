import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setCurrentModule } from '../../actions/layoutAction';
import Dashboard from './dashboard/Dashboard';

export const Dash = ({ setCurrentModule }) => {
	useEffect(() => {
		if (localStorage.currentModule) {
			setCurrentModule({ moduleRoute: 'dash', moduleName: 'Dashboard' });
			localStorage.setItem(
				'currentModule',
				JSON.stringify({ moduleRoute: 'dash', moduleName: 'Dashboard' })
			);
		}
	}, [setCurrentModule]);
	return <Dashboard />;
};

Dash.propTypes = {
	setCurrentModule: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	setCurrentModule
};

export default connect(mapStateToProps, mapDispatchToProps)(Dash);
