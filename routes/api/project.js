const express = require('express');
const auth = require('../../middleware/auth');

const Projects = require('../../models/Projects');
const Users = require('../../models/Users');
const UserTypes = require('../../models/normalizations/UserTypes');
const CompanyTypes = require('../../models/normalizations/CompanyTypes');
const ProjectTypes = require('../../models/normalizations/ProjectTypes');

const router = express.Router();

// @route    GET api/project/
// @desc     Get all projects
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		// const project = new Projects({
		//     companyID: '5e4e69623627231553c39e50',
		//     projectName: 'Track My Squad',
		//     projectTypeID: '5e4e68f23627231553c39e4c',
		//     teamMembers: [{
		//         memberID: '5e4e68f23627231553c39e4f',
		//         roleInProject: '5e4e68f23627231553c39e40'
		//     }],
		// });
		// const addedProject = await project.save();
		// console.log(addedProject);

		// Select userType field only from userType Reference
		const projectsList = await Projects.find({})
			.populate('companyID', 'companyName')
			.populate('projectTypeID', 'projectType');

		// const projectsList = await Projects.find({});

		res.status(200).json(projectsList);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/project/getAllUserTypes
// @desc     Get all project types
// @access   Private
router.get('/getAllProjectTypes', auth, async (req, res) => {
	try {
		const projectTypes = await ProjectTypes.find({});
		res.status(200).json(projectTypes);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/project/addMemberProfile
// @desc     Add a new Project
// @access   Private
router.post('/addProject', auth, async (req, res) => {
	try {
		const { companyName, projectType, projectName } = req.body;

		const project = new Projects({
			companyID: companyName._id,
			projectTypeID: projectType._id,
			projectName
		});

		const prjAdded = await project.save();

		Projects.populate(
			prjAdded,
			[
				{ path: 'projectTypeID', select: 'projectType' },
				{ path: 'companyID', select: 'companyName' }
			],
			(err, addedProject) => {
				if (err) throw err;
				console.log(addedProject);
				res.status(200).json(addedProject);
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.get('/getProjectNames', auth, async (req, res) => {
	try {
		const projectNames = await Projects.find({}).select('projectName');
		res.status(200).json(projectNames);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    PUT api/project/updateProjectDetails/id
// @desc     Update an existing Project
// @access   Private
router.put('/updateProjectDetails/:id', auth, async (req, res) => {
	try {
		const updatedProject = await Users.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				companyID: req.body.companyName._id,
				projectName: req.body.projectName,
				projectTypeID: req.body.projectType._id
			}
		);

		// Types of IDs are different one is ObjectID and other is string.
		if (updatedProject._id == req.body._id) {
			res.status(200).json(req.body);
		} else {
			res.status(400).send('Project updation failed');
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/project/deleteProject/id
// @desc     Delete an existing Project
// @access   Private
router.delete('/deleteProject/:id', auth, async (req, res) => {
	try {
		const deletedProject = await Projects.findByIdAndDelete(req.params.id);
		return res.status(200).json(deletedProject._id);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
