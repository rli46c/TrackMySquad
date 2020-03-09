import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
	makeStyles,
	Drawer,
	AppBar,
	Toolbar,
	List,
	Typography,
	Divider,
	IconButton,
	Badge
} from '@material-ui/core';
import {
	PersonPin,
	Menu,
	ChevronLeft,
	Notifications,
	ExitToApp
} from '@material-ui/icons';

import { mainListItems, secondaryListItems } from './listItems';
import { logout } from '../../../actions/authAction';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	profile: {
		fontSize: '20px',
		display: 'inline',
		verticalAlign: 'middle',
		textDecoration: 'none'
	},
	toolbar: {
		paddingRight: 24 // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: 36
	},
	menuButtonHidden: {
		display: 'none'
	},
	title: {
		flexGrow: 1
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9)
		}
	}
}));

export const NavCombo = ({
	auth: { user },
	logout,
	layout: { currentModule }
}) => {
	const [open, setOpen] = useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	const classes = useStyles();

	return (
		<Fragment>
			<AppBar
				position='absolute'
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
						)}
					>
						<Menu />
					</IconButton>
					<Typography
						component='h1'
						variant='h6'
						color='inherit'
						noWrap
						className={classes.title}
					>
						{currentModule.moduleName}
					</Typography>
					<IconButton color='inherit'>
						<Badge badgeContent={null} color='secondary'>
							{/* <Notifications /> */}
							{user && user.userCompany}
						</Badge>
					</IconButton>
					<IconButton color='inherit'>
						<Badge badgeContent={4} color='secondary'>
							<Notifications />
						</Badge>
					</IconButton>
					<IconButton color='inherit' onClick={() => logout()}>
						<Badge badgeContent={'!'} color='secondary'>
							<ExitToApp />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<Link to='/profile' className={classes.profile}>
						<span>
							<PersonPin />
							{user && ` ${user.firstName} ${user.lastName}`}
						</span>
					</Link>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeft />
					</IconButton>
				</div>
				<Divider />
				<List>{mainListItems}</List>
				<Divider />
				<List>{secondaryListItems}</List>
			</Drawer>
		</Fragment>
	);
};

NavCombo.propTypes = {
	auth: PropTypes.object.isRequired,
	layout: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	layout: state.layout
});

const mapDispatchToProps = {
	logout
};

export default connect(mapStateToProps, mapDispatchToProps)(NavCombo);
