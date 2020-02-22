import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const ProjectTypesCard = ({ usrType }) => {
    const { _id, userType } = usrType;
    
    return (
        <option value={ _id }>{ userType }</option>
    );
};

ProjectTypesCard.propTypes = {
    usrType: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTypesCard);