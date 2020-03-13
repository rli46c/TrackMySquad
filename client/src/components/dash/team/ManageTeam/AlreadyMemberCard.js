import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, FormControlLabel } from '@material-ui/core';

import {
	setMngTeamMemDialog,
	setCrntPrjCrntMemData
} from '../../../../actions/projectAction';

export const AlreadyMemberCard = ({
	memberData,
	setMngTeamMemDialog,
	setCrntPrjCrntMemData
}) => {
	const [checked, setChecked] = useState(true);
	const handleChange = () => {
		// setChecked(val => !val);
		setCrntPrjCrntMemData(memberData);
		setMngTeamMemDialog(true);
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					checked={checked}
					onChange={handleChange}
					value={{
						memberID: memberData.memberID._id,
						roleInProject: memberData.roleInProject.userType
					}}
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
	memberData: PropTypes.object.isRequired,
	setMngTeamMemDialog: PropTypes.func.isRequired,
	setCrntPrjCrntMemData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	setMngTeamMemDialog,
	setCrntPrjCrntMemData
};

export default connect(mapStateToProps, mapDispatchToProps)(AlreadyMemberCard);
