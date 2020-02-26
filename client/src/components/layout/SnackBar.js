import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { removeAlert } from '../../actions/layoutAction';

export const SnackBar = ({ layout: { alertMessages }, removeAlert }) => {
	const { enqueueSnackbar } = useSnackbar();

	const showSnack = alertObj => {
		const { id, msg } = alertObj;
		enqueueSnackbar(msg, { variant: 'success' });
		// setTimeout(() => removeAlert(id), 5000);
		removeAlert(id);
	};

	useEffect(() => {
		alertMessages !== null &&
			alertMessages.length > 0 &&
			alertMessages.map(alert => showSnack(alert));
	}, [showSnack]);

	console.log(alertMessages);

	return true;
};

SnackBar.propTypes = {
	layout: PropTypes.object.isRequired,
	removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	layout: state.layout
});

const mapDispatchToProps = {
	removeAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
