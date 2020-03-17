import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uuid } from 'uuidv4';
import { Checkbox, FormControlLabel } from '@material-ui/core';

import {
	setMngTeamMemDialog,
	setCrntPrjCrntMemData
} from '../../../../actions/projectAction';

export const RemainingMemberCard = ({
	memberData,
	setMngTeamMemDialog,
	setCrntPrjCrntMemData
}) => {
	const [checked] = useState(false);
	const handleChange = () => {
		// setChecked(val => !val);
		const reFrmatdMemData = {
			_id: uuid(),
			memberID: {
				_id: memberData._id,
				firstName: memberData.firstName,
				lastName: memberData.lastName
			},
			roleInProject: {
				_id: memberData.userType._id,
				userType: memberData.userType.userType
			}
		};
		setCrntPrjCrntMemData({ memberData: reFrmatdMemData, card: 'remaining' });
		setMngTeamMemDialog(true);
	};
	return (
		<FormControlLabel
			control={
				<Checkbox
					checked={checked}
					onChange={handleChange}
					value={{
						memberID: memberData._id,
						roleInProject: memberData.userType.userType
					}}
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
	memberData: PropTypes.object.isRequired,
	setMngTeamMemDialog: PropTypes.func.isRequired,
	setCrntPrjCrntMemData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	setMngTeamMemDialog,
	setCrntPrjCrntMemData
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RemainingMemberCard);
