const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const Users = require('../../models/Users');
const UserTypes = require('../../models/normalizations/UserTypes');
const CompanyTypes = require('../../models/normalizations/CompanyTypes');
const urlencode = require('urlencode');
const nodemailer = require('nodemailer');
const cryptoJS = require('crypto-js');
const config = require('config');
const router = express.Router();

// @route    GET api/team/
// @desc     Get all memebers except Admin
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const adminType = await UserTypes.findOne({ userType: 'Admin' });

		// Select userType field only from userType Reference
		const teamMember = await Users.find({ userType: { $ne: adminType._id } })
			.populate('userType', 'userType')
			.select('-userPass');
		console.log('teamMember', teamMember);
		//const projectname = await Projects.findOne({teamMembers: {memberID : teamMember._id}});
		//const project = await Projects.find();
		//const teanm = project[0].teamMembers;
		//console.log('project',project);
		elemntid = [];
		teamMember.forEach(element => {
			const elemnt = elemntid.push(element._id);
		});
		const project = await Projects.find({
			teamMembers: { $elemMatch: { memberID: { $in: elemntid } } }
		});

		//console.log('projectname',projectname);
		res.status(200).json({ teamMember, project });
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
		console.log('addedUser', req.body);
		const user = new Users(req.body);

		const addedUser = await user.save();
		console.log('addedUsernew', addedUser);
		//Projects.teamMembers.push({memberID: <ID>}, {roleInProject: <ROLE-ID>});
		//person.save(done);
		//~ const projectUpdate = await Projects.findByIdAndUpdate( req.body.projectName._id, { $push: { memberID: addedUser._id, roleInProject: req.body.userType._id } });
		const member = {
			memberID: addedUser._id,
			roleInProject: req.body.userType._id
		};
		const projectUpdate = await Projects.findByIdAndUpdate(
			req.body.projectName._id,
			{
				$push: {
					teamMembers: [
						{
							memberID: mongoose.Types.ObjectId(addedUser._id),
							roleInProject: mongoose.Types.ObjectId(req.body.userType._id)
						}
					]
				}
			}
		);
		console.log('projectUpdate', projectUpdate.projectName);
		// Could be fetched from the req.body itself to improve performace but will be less secure
		const usrTyp = await UserTypes.findOne({ _id: addedUser.userType }).select(
			'userType'
		);
		addedUser.projectName = projectUpdate.projectName;
		addedUser.userType = usrTyp;

		const projName = await Projects.findOne({
			_id: addedUser.projectName
		}).select('projectName');
		addedUser.projectName = projName;

		var ciphertext = cryptoJS.AES.encrypt(
			JSON.stringify({ user: addedUser.id, email: addedUser.userEmail }),
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
		console.log(sentMailResponse);
		res.status(200).json(addedUser);
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
