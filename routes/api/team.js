const express = require('express');
const mongoose = require('mongoose');
const urlencode = require('urlencode');
const nodemailer = require('nodemailer');
const cryptoJS = require('crypto-js');
const config = require('config');
const bcrypt = require('bcryptjs');
const router = express.Router();

const auth = require('../../middleware/auth');
const SuperUser = require('../../models/SuperUser');
const Users = require('../../models/Users');
const Projects = require('../../models/Projects');
const Companies = require('../../models/Companies');
const UserTypes = require('../../models/normalizations/UserTypes');

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
		const salt = await bcrypt.genSalt(10);
		user.userPass = await bcrypt.hash(user.userPass, salt);
		let userAdded = await user.save();

		const addedUser = await Users.findById(userAdded.id)
			.select('-userPass')
			.populate('userType', 'userType');

		const updatedProject = await Projects.findByIdAndUpdate(
			req.body.projectName._id,
			{
				$push: {
					teamMembers: [
						{
							memberID: mongoose.Types.ObjectId(userAdded._id),
							roleInProject: mongoose.Types.ObjectId(req.body.userType._id)
						}
					]
				}
			}
		);

		const projectUpdated = await Projects.findById(updatedProject.id);

		const superUserSettings = await SuperUser.findOne().select('sendMail');
		if (superUserSettings.sendMail) {
			// Encrypt
			var ciphertext = cryptoJS.AES.encrypt(
				JSON.stringify(addedUser),
				config.get('cryptoJSkeySecret')
			).toString();
			ciphertext = urlencode(ciphertext);
			const emailText = `Hello Falana Dhimkana \n your key is:\n${ciphertext}\n`;
			const emailHtml = `Hello Falana Dhimkana <br /> your key is:<br />${ciphertext}<br /><br /><a href="http://localhost:3000/login/${ciphertext}">Verify this Email Account</a>`;

			let transporter = nodemailer.createTransport({
				host: 'smtp.gmail.com',
				port: 587,
				secure: false,
				auth: {
					user: 'trackmysquad@gmail.com',
					pass: config.get('mailingCredentials')
				},
				tls: {
					rejectUnauthorized: false
				}
			});

			let sentMailResponse = await transporter.sendMail({
				from: 'Track My Squad <trackmysquad@gmail.com>',
				to: addedUser.userEmail,
				subject: 'Welcome to Track My Squad',
				text: emailText,
				html: emailHtml
			});
			console.log('Email Response', sentMailResponse);
		}

		return res.status(200).json({
			addedUser,
			projectUpdated
		});
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

router.delete('/deleteMember/:userID/:teamMemberID', auth, async (req, res) => {
	try {
		await Projects.findOneAndUpdate(req.params.userID, {
			$pull: { teamMembers: { _id: req.params.teamMemberID } }
		});
		const deletedUser = await Users.findByIdAndDelete(req.params.userID);

		// const deletedMember = await Projects.findOneAndUpdate({ teamMembers: { memberID: { $eq: req.params.id }}});
		return res.status(200).json(deletedUser._id);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/team/
// @desc     Get all memebers except Admin
// @access   Private
router.get('/:currentUser', auth, async (req, res) => {
	try {
		const companiesList = await Companies.find({
			companyOwner: req.params.currentUser
		}).select('id');

		let compIdList = new Array();
		companiesList.map(company => compIdList.push(company.id));

		const teamMemberObjArray = await Projects.find({
			companyID: {
				$in: compIdList
			}
		}).select('teamMembers');

		let membersIdSet = new Set();
		teamMemberObjArray.map(teamObj =>
			teamObj.teamMembers.map(memObj => membersIdSet.add(memObj.memberID))
		);
		const unqMemIdArray = Array.from(membersIdSet);

		const adminType = await UserTypes.findOne({ userType: 'Admin' });

		// Select userType field only from userType Reference
		const teamMember = await Users.find({
			$and: [
				{ userType: { $ne: adminType._id } },
				{ _id: { $in: unqMemIdArray } }
			]
		})
			.populate('userType', 'userType')
			.select('id firstName lastName userType userEmail');
		res.status(200).json(teamMember);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
