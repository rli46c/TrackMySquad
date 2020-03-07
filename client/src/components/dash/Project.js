import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
	makeStyles,
	CssBaseline,
	Box,
	Typography,
	Container,
	Grid,
	Paper,
	Link
} from '@material-ui/core';

import NavCombo from './dashboard/NavCombo';
import ProjectsList from './project/ProjectsList';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto'
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4)
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	},
	fixedHeight: {
		height: 240
	}
}));

const Project = () => {
	useEffect(() => {
		if (localStorage.currentModule) {
			localStorage.setItem('currentModule', 'projects');
		}
	}, []);

	const classes = useStyles();
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<NavCombo />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth='lg' className={classes.container}>
					<Grid container spacing={3}>
						{/* Projects List */}
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<ProjectsList />
							</Paper>
						</Grid>
						{/* Chart */}
						<Grid item xs={12} md={8} lg={9}>
							<Paper className={fixedHeightPaper}>{/* <Chart /> */}</Paper>
						</Grid>
						{/* Recent Deposits */}
						<Grid item xs={12} md={4} lg={3}>
							<Paper className={fixedHeightPaper}>{/* <Deposits /> */}</Paper>
						</Grid>
					</Grid>
					<Box pt={4}>
						<Copyright />
					</Box>
				</Container>
			</main>
		</div>
	);
};

Project.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
