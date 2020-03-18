const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const nodemailer = require('nodemailer');
const cryptoJS = require('crypto-js');
const urlencode = require('urlencode');
const { check, validationResult } = require('express-validator');
const SuperUser = require('../../models/SuperUser');
const Users = require('../../models/Users');
const UserMeta = require('../../models/UsersMeta');
const StatusTypes = require('../../models/normalizations/StatusTypes');
const UserTypes = require('../../models/normalizations/UserTypes');
const Companies = require('../../models/Companies');
const CompanyTypes = require('../../models/normalizations/CompanyTypes');
const ProjectTypes = require('../../models/normalizations/ProjectTypes');

// @route    GET api/company
// @desc     Create admin account
// @access   Public
router.get('/createAdmin', async (req, res) => {
	try {
		// const result = await bcrypt.hash('sdfi239', await bcrypt.genSalt(10));
		// console.log(result);

		bcrypt.genSalt(10, function(err, salt) {
			if (err) throw err;

			bcrypt.hash('abc123', salt, async function(err, hash) {
				if (err) throw err;

				const hasAdmin = await Users.find({});

				if (hasAdmin.length === 0) {
					const superUserSettings = new SuperUser({
						sendMail: false,
						emailValidationRequired: false
					});
					constsuperUserSettings = await superUserSettings.save();

					const savedStatusTypes = await StatusTypes.insertMany([
						{ statusType: 'Active' },
						{ statusType: 'Inactive' },
						{ statusType: 'Blocked' },
						{ statusType: 'Removed' },
						{ statusType: 'Restricted' }
					]);

					const savedUserTypes = await UserTypes.insertMany([
						{ userType: 'Admin' },
						{ userType: 'Developer' },
						{ userType: 'Manager' },
						{ userType: 'Team Lead' },
						{ userType: 'User' },
						{ userType: 'Dummy' }
					]);

					const savedCompanyTypes = await CompanyTypes.insertMany([
						{ companyType: 'Information Technology' },
						{ companyType: 'Telecommunication' },
						{ companyType: 'Automobile' },
						{ companyType: 'Pharmacy' },
						{ companyType: 'Textile' },
						{ companyType: 'Dummy' }
					]);

					const savedProjectTypes = await ProjectTypes.insertMany([
						{ projectType: 'Website' },
						{ projectType: 'Web App' },
						{ projectType: 'Content Management System' },
						{ projectType: 'Software' },
						{ projectType: 'Mobile App' }
					]);

					const superUser = new Users({
						firstName: 'Super',
						lastName: 'User',
						userName: 'admin123',
						userPass: hash,
						userType: savedUserTypes[0]._id,
						userEmail: 'trackmysquad@gmail.com',
						verifiedEmail: true
					});
					const crtdTmpUsr = await superUser.save();

					const superCompany = new Companies({
						companyOwner: crtdTmpUsr._id,
						companyName: 'Super Company',
						companyType: savedCompanyTypes[5]._id,
						companyContact: '+91 98765-43210'
					});
					const savedSuperCompany = await superCompany.save();

					const supUsrRcntComp = new UserMeta({
						recentCompany: savedSuperCompany._id
					});
					const savedRecents = await supUsrRcntComp.save();

					const createdUser = await Users.findByIdAndUpdate(crtdTmpUsr._id, {
						$set: {
							userMeta: savedRecents._id,
							$push: { userCompanies: savedSuperCompany._id }
						}
					});

					return res.status(200).json({
						savedUserTypes,
						savedCompanyTypes,
						createdUser,
						savedProjectTypes,
						savedStatusTypes
					});
				} else {
					return res.status(400).json({
						errors: [{ msg: 'Something went wrong while creating Admin' }]
					});
				}
			});
		});
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ errors: [{ msg: "Can't create admin account" }] });
	}
});

// @route    POST api/auth/register
// @desc     Register user & get token
// @access   Public
router.post(
	'/register',
	[
		check('userFullName', 'Admin Name is Required')
			.not()
			.isEmpty()
			.trim(),
		check('userCompany', 'Company Name is Required')
			.not()
			.isEmpty()
			.trim(),
		check('userEmail', 'Email is Required')
			.not()
			.isEmpty()
			.trim(),
		check('companyContact', 'Phone number is Required')
			.not()
			.isEmpty()
			.trim(),
		check('userPass', 'Password should be atleast 6 characters').isLength({
			min: 6
		})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		let {
			userFullName,
			userCompany,
			userEmail,
			companyContact,
			userPass
		} = req.body;

		const firstName = userFullName.slice(0, userFullName.search(' ')).trim();
		const lastName = userFullName
			.slice(userFullName.search(' ') + 1, userFullName.length)
			.trim();

		try {
			let user = await Users.findOne({ userEmail });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User Already Exists' }] });
			}

			user = new Users({
				firstName,
				lastName,
				userName: userEmail,
				userEmail,
				userPass,
				verifiedEmail: false
			});

			const salt = await bcrypt.genSalt(10);
			user.userPass = await bcrypt.hash(user.userPass, salt);

			user.userType = await UserTypes.findOne({ userType: 'Admin' }).select(
				'id'
			);

			user.save(async (err, savedUser) => {
				if (err) throw err;

				const compTyp = await CompanyTypes.findOne({
					companyType: 'Dummy'
				}).select('id');

				// Make new company with provided company name
				const company = new Companies({
					companyOwner: savedUser._id,
					companyName: userCompany,
					companyType: compTyp,
					companyContact
				});
				const savedCompany = await company.save();

				const userMeta = new UserMeta({
					userId: savedUser._id,
					recentCompany: savedCompany._id
				});
				const savedMeta = await userMeta.save();

				const updatedUser = await Users.findByIdAndUpdate(savedUser._id, {
					$set: {
						userMeta: savedMeta._id,
						$push: { userCompanies: company._id }
					}
				});

				const { id, firstName, lastName, userEmail } = updatedUser;

				const superUserSettings = await SuperUser.findOne().select('sendMail');

				if (superUserSettings.sendMail) {
					// Encrypt
					var ciphertext = cryptoJS.AES.encrypt(
						JSON.stringify({
							user: updatedUser.id,
							email: updatedUser.userEmail
						}),
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
						to: `${firstName} ${lastName} <${userEmail}>`,
						subject: 'Welcome to Track My Squad',
						text: emailText,
						html: emailHtml
					});

					console.log(sentMailResponse);
				}
			});

			return res.status(200).json({ firstName, lastName, userEmail });
		} catch (err) {
			console.error(err);
			return res.status(500).json({
				errors: [{ msg: 'Something went wrong while Registering User' }]
			});
		}
	}
);

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
	'/login',
	[
		check('un', 'Username is required.')
			.exists()
			.not()
			.isEmpty()
			.trim(),
		check('up', 'Password should be atleast 6 characters.')
			.exists()
			.isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { un, up } = req.body;
		let welcomeMsg = false;
		try {
			let currentUser = await Users.findOne({
				$or: [{ userName: un }, { userEmail: un }]
			});

			if (!currentUser) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			const isMatch = await bcrypt.compare(up, currentUser.userPass);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			if (currentUser.verifiedEmail !== true) {
				let decryptedData = null;

				// Decrypt and Verify Key Parameter
				if (req.body.hasOwnProperty('keyVal')) {
					let ciphertext = urlencode.decode(req.body.keyVal);

					// Decrypt
					let bytes = cryptoJS.AES.decrypt(
						ciphertext,
						config.get('cryptoJSkeySecret')
					);

					try {
						decryptedData = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
					} catch (e) {
						if (e instanceof SyntaxError) {
							return res
								.status(400)
								.json({ errors: [{ msg: 'Invalid Credentials' }] });
						} else {
							return res
								.status(400)
								.json({ errors: [{ msg: 'Verify your email first.' }] });
						}
					}
				} else {
					// In case no Key Parameter provided and Email is also not Verified
					return res
						.status(400)
						.json({ errors: [{ msg: 'Verify your email first.' }] });
				}

				if (
					decryptedData &&
					decryptedData.hasOwnProperty('user') &&
					decryptedData.hasOwnProperty('email')
				) {
					const { user, email } = decryptedData;

					// To check whether user is not using someone else's Key
					if (user === currentUser.id) {
						const verifiedUser = await Users.findOneAndUpdate(
							{ $and: [{ _id: user }, { userEmail: email }] },
							{ verifiedEmail: true }
						);

						if (!verifiedUser) {
							return res
								.status(400)
								.json({ errors: [{ msg: 'Verify your email first.' }] });
						}
						welcomeMsg = true;
					} else {
						return res
							.status(400)
							.json({ errors: [{ msg: 'Invalid Credentials' }] });
					}
				} else {
					return res
						.status(400)
						.json({ errors: [{ msg: 'Verify your email first.' }] });
				}
			}

			const payload = {
				user: {
					id: currentUser.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) {
						console.error(err);
						return res
							.status(500)
							.json({ errors: [{ msg: 'User Authentication Failed' }] });
					}
					return res
						.status(200)
						.json({ token, isAuthenticated: true, welcomeMsg });
				}
			);
		} catch (err) {
			console.error(err);
			return res
				.status(500)
				.json({ errors: [{ msg: 'Authentication Failed' }] });
		}
	}
);

// @route    GET api/auth
// @desc     Get User Data from token
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await Users.findById(req.user.id)
			.select('_id firstName lastName userMeta')
			.populate({
				path: 'userMeta',
				populate: {
					path: 'recentCompany',
					model: Companies,
					select: 'companyName'
				}
			});

		return res.status(200).json(user);
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ errors: [{ msg: 'Authentication Failure' }] });
	}
});

module.exports = router;
