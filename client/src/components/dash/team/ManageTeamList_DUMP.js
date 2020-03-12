import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProjects } from '../../../actions/projectAction';
import { setManageTeamList } from '../../../actions/teamAction';
import TeamListCard from './TeamListCard';
import {
	makeStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
	FormControl,
	InputLabel,
	NativeSelect,
	Button,
	TextField,
	Checkbox,
	FormControlLabel
} from '@material-ui/core';
import { Close, CheckBox } from '@material-ui/icons';
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
			//   width: '100%',
		},
		marginRight: theme.spacing(2)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	closebtn: {
		float: 'right'
	}
}));

export const Projectteamlist = ({
	project: { teamusers, projects },
	team: { manageMembersDialogOpen },
	getAllProjects,
	setManageTeamList
}) => {
	const [fullWidth] = useState(true);
	const [maxWidth] = useState('sm');
	useEffect(() => {
		getAllProjects();
	}, [getAllProjects]);
	const classes = useStyles();

	return (
		<Dialog
			keepMounted
			disableBackdropClick
			onClose={() => setManageTeamList(false)}
			open={manageMembersDialogOpen}
			TransitionComponent={Transition}
			fullWidth={fullWidth}
			maxWidth={maxWidth}
			aria-labelledby='add-project-profile'
			aria-describedby='memberlist'
		>
			<DialogTitle>
				<span>Member List</span>
				<Close
					onClick={() => setManageTeamList(false)}
					className={classes.closebtn}
				/>
			</DialogTitle>
			<DialogContent>
				<form
					className={classes.root}
					noValidate
					autoComplete='off'
					onKeyPress={e => {
						e.key === 'Enter' && e.preventDefault();
					}}
					id='memberlist'
				>
					<FormControl
						variant='standard'
						className={classes.formControl}
						fullWidth
					>
						{teamusers.map((team, id) => (
							<TeamListCard
								key={id}
								teamData={team}
								projteamData={{ projects }}
							/>
						))}
					</FormControl>
					{/* <FormControl
						variant='standard'
						className={classes.formControl}
						fullWidth
					>
						{projects.map(memberlist =>
							memberlist.teamMembers.map((memberdata, id) => (
								<TeamListCard key={id} projteamData={memberdata} />
							))
						)}
					
					</FormControl> */}
				</form>
			</DialogContent>
			<DialogActions>
				<Button color='secondary' variant='contained' tabIndex='0'>
					save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

Projectteamlist.propTypes = {
	getAllProjects: PropTypes.func.isRequired,
	team: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired,
	setManageTeamList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	project: state.project,
	team: state.team
});

const mapDispatchToProps = {
	getAllProjects,
	setManageTeamList
};

export default connect(mapStateToProps, mapDispatchToProps)(Projectteamlist);
