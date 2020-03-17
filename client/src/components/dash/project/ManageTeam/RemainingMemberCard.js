import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, FormControlLabel } from '@material-ui/core';

export const RemainingMemberCard = ({ memberData }) => {
	return (
		<FormControlLabel
			control={
				<Checkbox
					// checked={state.checkedB}
					// onChange={handleChange('checkedB')}
					value='checkedB'
					color='primary'
				/>
			}
			label={`${memberData.firstName.toUpperCase()} ${memberData.lastName.toUpperCase()} - ${
				memberData.userType.userType
			}`}
		/>
	);
};

RemainingMemberCard.propTypes = {
	memberData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RemainingMemberCard);
