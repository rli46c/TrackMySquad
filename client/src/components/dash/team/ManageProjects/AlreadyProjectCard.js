import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControlLabel, Checkbox } from '@material-ui/core';

export const AlreadyProjectCard = ({ projectList }) => {
	const [checked, setChecked] = useState(true);
	console.log('projectList', projectList);

	return (
		<Fragment>
			<FormControlLabel
				control={
					<Checkbox
						checked={checked}
						value={{
							id: projectList._id
						}}
						color='primary'
					/>
				}
				label={`${projectList.projectName.toUpperCase()}`}
			/>
		</Fragment>
	);
};

AlreadyProjectCard.propTypes = {
	projectList: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AlreadyProjectCard);
