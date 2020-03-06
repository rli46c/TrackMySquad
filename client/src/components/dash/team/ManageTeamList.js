import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProjects } from '../../../actions/projectAction';
import { setManageTeamList } from '../../../actions/teamAction';
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
	}
}));

export const Projectteamlist = ({
	project: { teamusers },
	team: { addMemberlistDialogOpen },
	getAllProjects,
	setManageTeamList
}) => {
	const [fullWidth] = useState(true);
	const [maxWidth] = useState('sm');
	useEffect(() => {
		getAllProjects();
	}, [getAllProjects]);
	console.log('teamusers', teamusers);
	const classes = useStyles();
	return (
		<Dialog
			keepMounted
			disableBackdropClick
			onClick={() => setManageTeamList(false)}
			open={addMemberlistDialogOpen}
			TransitionComponent={Transition}
			fullWidth={fullWidth}
			maxWidth={maxWidth}
			aria-labelledby='add-project-profile'
			aria-describedby='memberlist'
		>
			<DialogTitle>
				<span>Member List</span>
				<Close onClick={() => setManageTeamList(false)} />
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
						<FormControlLabel
							control={<Checkbox value='checkedB' color='primary' />}
							label='Primary'
						/>
					</FormControl>
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
