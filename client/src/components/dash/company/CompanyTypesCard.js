import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const CompanyTypesCard = ({ compType }) => {
    const { _id, companyType } = compType;
    
    return (
        <option value={ _id } >{ companyType }</option>
    );
};

CompanyTypesCard.propTypes = {
    compType: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyTypesCard);