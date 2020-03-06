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

const Users = require('../../models/Users');
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

					const user = new Users({
						firstName: 'Vinayak',
						lastName: 'Sharma',
						userName: 'admin123',
						userPass: hash,
						userType: savedUserTypes[0]._id,
						userCompany: 'Super User',
						companyType: await CompanyTypes.findOne({
							companyType: 'Dummy'
						}).select('id'),
						userEmail: 'vinayak252@gmail.com',
						verifiedEmail: true
					});
					const createdUser = await user.save();
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
		check('firstName', 'First Name is Required')
			.not()
			.isEmpty(),
		check('lastName', 'Last Name is Required')
			.not()
			.isEmpty(),
		check('userCompany', 'Company Name is Required')
			.not()
			.isEmpty(),
		check('userEmail', 'Email is Required')
			.not()
			.isEmpty(),
		check('userPass', 'Password should be atleast 6 characters').isLength({
			min: 6
		})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const {
			firstName,
			lastName,
			userCompany,
			userEmail,
			userPass,
			userType
		} = req.body;

		try {
			let user = await Users.findOne({ userEmail });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User Already Exists' }] });
			}

			const compTyp = await CompanyTypes.findOne({
				companyType: 'Dummy'
			}).select('id');

			user = new Users({
				firstName,
				lastName,
				userCompany,
				userName: userEmail,
				companyType: compTyp,
				userEmail,
				userPass,
				userType
			});

			const salt = await bcrypt.genSalt(10);
			user.userPass = await bcrypt.hash(user.userPass, salt);

			user.userType = await UserTypes.findOne({ userType: 'Admin' }).select(
				'id'
			);

			user.save(async (err, savedUser) => {
				if (err) throw err;

				const { id, firstName, lastName, userEmail, userCompany } = savedUser;

				// Make new company with provided company name

				const company = new Companies({
					companyOwner: id,
					companyName: userCompany,
					companyType: compTyp
				});

				await company.save();

				// Encrypt
				var ciphertext = cryptoJS.AES.encrypt(
					JSON.stringify({ user: savedUser.id, email: savedUser.userEmail }),
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
			.isEmpty(),
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

		try {
			let currentUser = await Users.findOne({
				$or: [{ userName: un }, { userEmail: un }]
			});

			if (!currentUser) {
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

			const isMatch = await bcrypt.compare(up, currentUser.userPass);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
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
					return res.status(200).json({ token, isAuthenticated: true });
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
		const user = await Users.findById(req.user.id).select('-userPass');
		return res.status(200).json(user);
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ errors: [{ msg: 'Authentication Failure' }] });
	}
});

module.exports = router;
