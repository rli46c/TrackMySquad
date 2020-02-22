import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const UserTypesCard = ({ usrType }) => {
    const { _id, userType } = usrType;
    
    return (
        <option value={ _id }>{ userType }</option>
    );
};

UserTypesCard.propTypes = {
    usrType: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTypesCard);