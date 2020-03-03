import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const CompanyNamesCard = ({ compName: { _id, companyName } }) => {
	return <option value={_id}>{companyName}</option>;
};

CompanyNamesCard.propTypes = {
	compName: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyNamesCard);
