import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	makeStyles,
	TableRow,
	TableCell,
	IconButton,
	Button,
	Slide
} from '@material-ui/core';
import { Edit, DeleteForever, Cancel } from '@material-ui/icons';

import { deleteMember, setMemberToEdit } from '../../../actions/teamAction';

const useStyles = makeStyles(theme => ({
	tableCell: {
		whiteSpace: 'normal',
		wordWrap: 'break-word'
	},
	rowToSlide: {
		zIndex: 1,
		position: 'relative',
		margin: theme.spacing(1)
	},
	deleteButton: {
		borderWidth: '2px',
		borderStyle: 'solid'
	},
	highlightText: {
		color: '#fff',
		fontWeight: 'bold'
	}
}));

export const MemberCard = ({
	memberData: { _id, firstName, lastName, userType, userEmail },
	projectNames: { projNams },
	deleteMember,
	setMemberToEdit
}) => {
	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		setChecked(prev => !prev);
	};
	const onEdit = () => {
		setMemberToEdit({
			_id,
			firstName,
			lastName,
			userType,
			userEmail
		});
	};

	const onDelete = () => {
		handleChange();
		let teamMemberID = null;
		projNams.forEach(projectData => {
			projectData.teamMembers.forEach(memberData => {
				if (memberData.memberID === _id) {
					teamMemberID = memberData._id;
				}
			});
		});
		deleteMember({ userID: _id, teamMemberID });
	};

	const classes = useStyles();

	return (
		<Fragment>
			<TableRow style={checked ? { backgroundColor: '#ff0000' } : null}>
				<TableCell
					className={checked ? classes.highlightText : classes.tableCell}
				>
					{firstName}
				</TableCell>
				<TableCell
					className={checked ? classes.highlightText : classes.tableCell}
				>
					{lastName}
				</TableCell>
				<TableCell className={checked ? classes.highlightText : null}>
					{userType.userType}
				</TableCell>
				<TableCell className={checked ? classes.highlightText : null}>
					{projNams.map(namelist =>
						namelist.teamMembers.map(member =>
							_id === member.memberID ? namelist.projectName : ''
						)
					)}
				</TableCell>
				<TableCell
					className={checked ? classes.highlightText : classes.tableCell}
				>
					{userEmail}
				</TableCell>
				<TableCell align='right'>
					<input
						type='button'
						id='edit-member-profile'
						style={{ display: 'none' }}
					/>
					<label
						htmlFor='edit-member-profile'
						onClick={!checked ? onEdit : null}
					>
						<IconButton
							color={checked ? 'default' : 'primary'}
							aria-label='Edit Profile'
							component='span'
						>
							<Edit />
						</IconButton>
					</label>
				</TableCell>
				<TableCell align='right'>
					<input
						type='button'
						id='delete-member-profile'
						style={{ display: 'none' }}
					/>
					<label htmlFor='delete-member-profile' onClick={handleChange}>
						<IconButton
							color={checked ? 'inherit' : 'primary'}
							aria-label='Delete Profile'
							component='span'
						>
							{checked ? <Cancel /> : <DeleteForever />}
						</IconButton>
					</label>
				</TableCell>
			</TableRow>
			<Slide direction='left' in={checked} mountOnEnter unmountOnExit>
				<TableRow elevation={4} className={classes.rowToSlide}>
					<TableCell colSpan='5'>
						<span>Are you sure you want to delete? &nbsp; </span>
						<Button
							className={classes.deleteButton}
							onClick={onDelete}
							color='secondary'
						>
							Delete
						</Button>
						<Button color='primary' onClick={handleChange}>
							Cancel
						</Button>
					</TableCell>
				</TableRow>
			</Slide>
		</Fragment>
	);
};

MemberCard.propTypes = {
	memberData: PropTypes.object.isRequired,
	projectNames: PropTypes.object.isRequired,
	deleteMember: PropTypes.func.isRequired,
	setMemberToEdit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	deleteMember,
	setMemberToEdit
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberCard);
