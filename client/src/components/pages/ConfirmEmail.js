import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { deRegister } from '../../actions/authAction';
import { Container } from '@material-ui/core';
import Appbar from '../layout/Appbar';
import Footer from '../layout/Footer';
export const ConfirmEmail = ({ auth: { isRegistered, user }, deRegister }) => {
	useEffect(() => {
		deRegister();
	}, [deRegister]);

	if (!user) {
		return <Redirect to='/' />;
	}

	return (
		<Fragment>
			<Appbar />
			<Container>
				<div className='emailmessage'>
					<div className='emailbox'>
						<p>Dear {`${user.firstName} ${user.lastName}`},</p>
						<p>Please confirm your email {user.userEmail}</p>
					</div>
				</div>
			</Container>
			<Footer />
		</Fragment>
	);
};

ConfirmEmail.propTypes = {
	auth: PropTypes.object.isRequired,
	deRegister: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

const mapDispatchToProps = {
	deRegister
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
