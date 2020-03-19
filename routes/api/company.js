const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const Companies = require('../../models/Companies');
const Addresses = require('../../models/Addresses');
const CompanyTypes = require('../../models/normalizations/CompanyTypes');

const router = express.Router();

// @route    GET api/company/getAllCompanyTypes
// @desc     Get all company types
// @access   Private
router.get('/getAllCompanyTypes', auth, async (req, res) => {
	try {
		const companyTypes = await CompanyTypes.find({}).select('companyType');
		res.status(200).json(companyTypes);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

// @route    POST api/company/addCompanyProfile
// @desc     Add a new Company Profile
// @access   Private
router.post('/addCompanyProfile', auth, async (req, res) => {
	const {
		user,
		companyName,
		companyType,
		companyContact,
		address1,
		address2,
		companyStreet,
		companyCity,
		companyCountry,
		companyZip
	} = req.body;

	let addedAddress = null;
	try {
		const addressToAdd = new Addresses({
			address1,
			address2,
			street: companyStreet,
			city: companyCity,
			country: companyCountry,
			zip: companyZip
		});

		addedAddress = await addressToAdd.save();
	} catch (err) {
		console.error(err);
		return res.status(500).send('Unable to save Company Address');
	}

	try {
		const company = new Companies({
			companyOwner: mongoose.Types.ObjectId(user._id),
			companyName,
			companyType,
			companyContact,
			companyAddress: addedAddress._id
		});

		const addedCompany = await company.save();

		// Could be fetched from the req.body itself to improve performace but will be less secure
		const comTyp = await CompanyTypes.findOne({
			_id: addedCompany.companyType
		}).select('companyType');
		addedCompany.companyType = comTyp;

		res.status(200).json(addedCompany);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/company/removeCompany/:id
// @desc     Delete a Company Profile
// @access   Private
router.delete('/removeCompany/:id', auth, async (req, res) => {
	try {
		const removedCompany = await Companies.findByIdAndDelete(req.params.id);
		res.status(200).json(removedCompany._id);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    PUT api/company/updateCompanyProfile/:id
// @desc     Update a company profile
// @access   Private
router.put('/updateCompanyProfile/:id', auth, async (req, res) => {
	try {
		const updatedCompany = await Companies.findByIdAndUpdate(
			req.params.id,
			req.body
		);

		// Types of IDs are different one is ObjectID and other is string.
		if (updatedCompany._id == req.body._id) {
			res.status(200).json(req.body);
		} else {
			res.status(400).send('Profile updation failed');
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/company/getAllCompanyTypes
// @desc     Get all company types
// @access   Private
router.get('/getCompanyNames/:currentUser', auth, async (req, res) => {
	try {
		const companyNames = await Companies.find({
			companyOwner: req.params.currentUser
		}).select('companyName');
		res.status(200).json(companyNames);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

// @route    GET api/company
// @desc     Get all company profiles
// @access   Private
router.get('/:currentUser', auth, async (req, res) => {
	try {
		// Populate with companyType only
		const companiesList = await Companies.find({
			companyOwner: req.params.currentUser
		})
			.populate('companyType', 'companyType')
			.populate('companyAddress', 'city');
		res.status(200).json(companiesList);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

module.exports = router;
