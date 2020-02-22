import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Appbar from '../layout/Appbar';

export const HomePage = ({}) => {

    return (
        <div>
            
        </div>
    );
};

HomePage.propTypes = {
    // prop: PropTypes
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);