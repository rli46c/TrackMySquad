import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { deRegister } from '../../actions/authAction';

export const ConfirmEmail = ({ auth: { isRegistered, user }, deRegister }) => {
    useEffect(()=>{
        deRegister();
    }, [deRegister]);

    if(!user) {
        return <Redirect to="/" />;
    }
    
    return (
        <div>
            <br/><br/><br/><br/><br/><br/>
            <p>Dear { `${user.firstName} ${user.lastName}`},</p>
            <p>Please confirm your email {user.userEmail}</p>
        </div>
    );
};

ConfirmEmail.propTypes = {
    auth: PropTypes.object.isRequired,
    deRegister: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = {
    deRegister
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);