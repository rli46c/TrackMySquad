const express = require('express');
const auth = require('../../middleware/auth');
const Users = require('../../models/Users');
const UserTypes = require('../../models/normalizations/UserTypes');
const CompanyTypes = require('../../models/normalizations/CompanyTypes');

const router = express.Router();

// @route    GET api/team/
// @desc     Get all memebers except Admin
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const adminType = await UserTypes.findOne({ userType: 'Admin' });

		// Select userType field only from userType Reference
		const teamMembers = await Users.find({ userType: { $ne: adminType._id } })
			.populate('userType', 'userType')
			.populate('companyType', 'companyType')
			.select('-userPass');

		res.status(200).json(teamMembers);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/team/getAllUserTypes
// @desc     Get all user types
// @access   Private
router.get('/getAllUserTypes', auth, async (req, res) => {
	try {
		const userTypes = await UserTypes.find({ userType: { $ne: 'Admin' } });
		res.status(200).json(userTypes);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/team/addMemberProfile
// @desc     Add a new Member Profile
// @access   Private
router.post('/addMemberProfile', auth, async (req, res) => {
	try {
		const user = new Users(req.body);

		const addedUser = await user.save();

		// Could be fetched from the req.body itself to improve performace but will be less secure
		const usrTyp = await UserTypes.findOne({ _id: addedUser.userType }).select(
			'userType'
		);
		addedUser.userType = usrTyp;

		// Could be fetched from the req.body itself to improve performace but will be less secure
		const cmpType = await CompanyTypes.findOne({
			_id: addedUser.companyType
		}).select('companyType');
		addedUser.companyType = cmpType;

		return res.status(200).json(addedUser);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

router.put('/updateMemberProfile/:id', auth, async (req, res) => {
	try {
		const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body);

		// Types of IDs are different one is ObjectID and other is string.
		if (updatedUser._id == req.body._id) {
			res.status(200).json(req.body);
		} else {
			res.status(400).send('Profile updation failed');
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

router.delete('/deleteMember/:id', auth, async (req, res) => {
	try {
		const deletedUser = await Users.findByIdAndDelete(req.params.id);
		return res.status(200).json(deletedUser._id);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
