import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dashboard from './dashboard/Dashboard';

export const Dash = ({}) => {

    return (
        <Dashboard />
    );
};

Dash.propTypes = {
    // prop: PropTypes
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Dash);