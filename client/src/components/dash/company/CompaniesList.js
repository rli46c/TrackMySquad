import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	makeStyles,
	Link,
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	Fab
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import {
	getAllCompanies,
	setAddCompanyDialog
} from '../../../actions/companyAction';
import CompanyCard from './CompanyCard';
import AddNewCompany from './AddNewCompany';
import EditCompanyDetails from './EditCompanyDetails';

const useStyles = makeStyles(theme => ({
	seeMore: {
		marginTop: theme.spacing(3)
	},
	addCompIcon: {
		position: 'fixed',
		right: theme.spacing(3),
		bottom: theme.spacing(3)
	}
}));

export const CompaniesList = ({
	auth: {
		user: { _id: currentUser }
	},
	company: { companies, addCompanyDialogOpen, companyToEdit, companyErrors },
	getAllCompanies,
	setAddCompanyDialog
}) => {
	useEffect(() => {
		getAllCompanies(currentUser);
	}, [currentUser, getAllCompanies]);

	const classes = useStyles();
	return (
		<Fragment>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Address</TableCell>
						<TableCell align='right'>Edit Details</TableCell>
						<TableCell align='right'>Delete</TableCell>
						{/* <TableCell align="center" colSpan="2">Actions</TableCell> */}
					</TableRow>
				</TableHead>
				<TableBody>
					{companies.map((company, id) => (
						<CompanyCard key={id} profileData={company} />
					))}
				</TableBody>
			</Table>

			<div className={classes.seeMore}>
				<Link color='primary' href='#'>
					See more companies
				</Link>
			</div>

			<Fab
				className={classes.addCompIcon}
				onClick={() => setAddCompanyDialog(true)}
				color='primary'
				aria-label='add'
			>
				<Add />
			</Fab>

			{addCompanyDialogOpen && <AddNewCompany />}
			{Object.entries(companyToEdit).length !== 0 && <EditCompanyDetails />}
		</Fragment>
	);
};

CompaniesList.propTypes = {
	auth: PropTypes.object.isRequired,
	company: PropTypes.object.isRequired,
	getAllCompanies: PropTypes.func.isRequired,
	setAddCompanyDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	company: state.company
});

const mapDispatchToProps = {
	getAllCompanies,
	setAddCompanyDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesList);
