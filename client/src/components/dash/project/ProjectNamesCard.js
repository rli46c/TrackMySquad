import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export const ProjectNameCard = ({ projName : {_id, projectName}}) => {
	return <option value={_id}>{projectName}</option>
};

ProjectNameCard.propTypes = {
	projName: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps,mapDispatchToProps)(ProjectNameCard);
