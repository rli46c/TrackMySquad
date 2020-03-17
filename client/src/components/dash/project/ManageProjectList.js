import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	makeStyles,
	AppBar,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormGroup,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	ListItemText,
	ListItem,
	List,
	Divider,
	Button,
	Typography,
	Toolbar,
	Slide,
	Paper
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { showProjectDialog } from '../../../actions/projectAction';
import AlreadyProjectCard from '../team/ManageProjects/AlreadyProjectCard';

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export const ManageProject = ({
	project: { manageProjectDialogOpen, projectdata },
	showProjectDialog
}) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClose = e => {
		e.preventDefault();
		showProjectDialog(false);
	};

	return (
		<Fragment>
			<div>
				<Dialog
					fullScreen
					open={manageProjectDialogOpen}
					onClose={handleClose}
					TransitionComponent={Transition}
				>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								edge='start'
								color='inherit'
								onClick={handleClose}
								aria-label='close'
							>
								<Close />
							</IconButton>
							<Typography variant='h6' className={classes.title}>
								Sound
							</Typography>
							<Button autoFocus color='inherit' onClick={handleClose}>
								save
							</Button>
						</Toolbar>
					</AppBar>
					<div className={classes.root}>
						<Grid container spacing={3}>
							<Grid item xs={12} md={4}>
								<Paper className={classes.paper}>
									<h3>Already Members</h3>
									<FormGroup>
										{projectdata.length > 0 &&
											projectdata.map((member, id) => (
												<AlreadyProjectCard key={id} projectList={member} />
											))}
									</FormGroup>
								</Paper>
							</Grid>
							<Grid item xs>
								<Paper className={classes.paper}>
									<h3>Other Members</h3>
								</Paper>
							</Grid>
						</Grid>
					</div>
				</Dialog>
			</div>
		</Fragment>
	);
};

ManageProject.propTypes = {
	project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	project: state.project
});

const mapDispatchToProps = {
	showProjectDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProject);
