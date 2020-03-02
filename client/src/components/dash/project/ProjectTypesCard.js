import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const ProjectTypesCard = ({ prjType }) => {
	const { _id, projectType } = prjType;

	return <option value={_id}>{projectType}</option>;
};

ProjectTypesCard.propTypes = {
	prjType: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTypesCard);
