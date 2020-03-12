import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, FormControlLabel } from '@material-ui/core';

export const AlreadyMemberCard = ({ memberData }) => {
	return (
		<FormControlLabel
			control={
				<Checkbox
					defaultChecked
					// checked={state.checkedB}
					// onChange={handleChange('checkedB')}
					value='checkedB'
					color='primary'
				/>
			}
			label={`${memberData.memberID.firstName.toUpperCase()} ${memberData.memberID.lastName.toUpperCase()} - ${
				memberData.roleInProject.userType
			}`}
		/>
	);
};

AlreadyMemberCard.propTypes = {
	memberData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AlreadyMemberCard);
