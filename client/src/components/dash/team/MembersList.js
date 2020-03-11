import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	makeStyles,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Link,
	Fab
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { getAllMembers, setAddMemberDialog } from '../../../actions/teamAction';
import MemberCard from './MemberCard';
import AddNewMember from './AddNewMember';
import EditMemberDetails from './EditMemberDetails';

const useStyles = makeStyles(theme => ({
	seeMore: {
		marginTop: theme.spacing(3)
	},
	addMemberIcon: {
		position: 'fixed',
		right: theme.spacing(3),
		bottom: theme.spacing(3)
	}
}));

export const MembersList = ({
	auth: {
		user: { _id: currentUser }
	},
	team: {
		teamMembers,
		projectNamelist,
		addMemberDialogOpen,
		memberToEdit,
		teamErrors
	},
	getAllMembers,
	setAddMemberDialog
}) => {
	useEffect(() => {
		getAllMembers(currentUser);
	}, [currentUser, getAllMembers]);

	const classes = useStyles();

	return (
		<Fragment>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>First Name</TableCell>
						<TableCell>Last Name</TableCell>
						<TableCell>User Type</TableCell>
						<TableCell>Project Name</TableCell>
						<TableCell>User Email</TableCell>
						<TableCell align='center' colSpan='2'>
							Actions
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{teamMembers.length >= 0 &&
						teamMembers.map((member, id) => (
							<MemberCard
								key={id}
								memberData={member}
								projectNames={{ projNams: projectNamelist }}
							/>
						))}
				</TableBody>
			</Table>

			<div className={classes.seeMore}>
				<Link color='primary' href='#'>
					See more members
				</Link>
			</div>

			<Fab
				className={classes.addMemberIcon}
				onClick={() => setAddMemberDialog(true)}
				color='primary'
				aria-label='add'
			>
				<Add />
			</Fab>

			{addMemberDialogOpen && <AddNewMember />}
			{Object.entries(memberToEdit).length !== 0 && <EditMemberDetails />}
		</Fragment>
	);
};

MembersList.propTypes = {
	auth: PropTypes.object.isRequired,
	getAllMembers: PropTypes.func.isRequired,
	setAddMemberDialog: PropTypes.func.isRequired,
	team: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	team: state.team
});

const mapDispatchToProps = {
	getAllMembers,
	setAddMemberDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersList);
