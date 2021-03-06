import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';

import { removeAlert } from '../../actions/layoutAction';
import { logout } from '../../actions/authAction';
import { Redirect } from 'react-router-dom';

export const SnackBar = ({
	layout: { alertMessages },
	removeAlert,
	logout
}) => {
	const { enqueueSnackbar } = useSnackbar();

	const showSnack = alertObj => {
		const { id, status, msg } = alertObj;

		if (status == 401) {
			removeAlert(id);
			logout();
			return <Redirect to='/login' />;
		} else {
			let variant = 'default';

			switch (true) {
				case status >= 100 && status <= 199:
					variant = 'info';
					break;

				case status >= 200 && status <= 299:
					variant = 'success';
					break;

				case status >= 300 && status <= 399:
					variant = 'default';
					break;

				case status >= 400 && status <= 499:
					variant = 'error';
					break;

				case status >= 500 && status <= 599:
					variant = 'warning';
					break;

				default:
					variant = 'default';
					break;
			}

			enqueueSnackbar(msg, { variant });
			// enqueueSnackbar(`${status}: ${msg}`, { variant });
			// setTimeout(() => removeAlert(id), 5000);
			removeAlert(id);
		}
	};

	useEffect(() => {
		alertMessages !== null &&
			alertMessages.length > 0 &&
			alertMessages.map(alert => showSnack(alert));
	}, [alertMessages, showSnack]);

	return true;
};

SnackBar.propTypes = {
	layout: PropTypes.object.isRequired,
	removeAlert: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	layout: state.layout
});

const mapDispatchToProps = {
	removeAlert,
	logout
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
