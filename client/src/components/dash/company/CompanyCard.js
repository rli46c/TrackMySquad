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

import {
	deleteCompany,
	setCompanyToEdit
} from '../../../actions/companyAction';

const useStyles = makeStyles(theme => ({
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

export const CompanyCard = ({
	profileData: { _id, companyName, companyType, companyAddress },
	deleteCompany,
	setCompanyToEdit
}) => {
	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		setChecked(prev => !prev);
	};

	const onEdit = () => {
		setCompanyToEdit({
			_id,
			companyName,
			companyType,
			companyAddress
		});
	};

	const onDelete = () => {
		handleChange();
		deleteCompany(_id);
	};

	const classes = useStyles();

	return (
		<Fragment>
			<TableRow style={checked ? { backgroundColor: '#ff0000' } : null}>
				<TableCell className={checked ? classes.highlightText : null}>
					{companyName && companyName}
				</TableCell>
				<TableCell className={checked ? classes.highlightText : null}>
					{companyType.hasOwnProperty('companyType') && companyType.companyType}
				</TableCell>
				<TableCell className={checked ? classes.highlightText : null}>
					{companyAddress.hasOwnProperty('city') && companyAddress.city}
				</TableCell>
				<TableCell align='right'>
					<input
						type='button'
						id='edit-company-profile'
						style={{ display: 'none' }}
					/>
					<label
						htmlFor='edit-company-profile'
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
						id='delete-company-profile'
						style={{ display: 'none' }}
					/>
					<label htmlFor='delete-company-profile' onClick={handleChange}>
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

CompanyCard.propTypes = {
	profileData: PropTypes.object.isRequired,
	deleteCompany: PropTypes.func.isRequired,
	setCompanyToEdit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	deleteCompany,
	setCompanyToEdit
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCard);
