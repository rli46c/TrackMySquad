const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');

const Companies = require('../../models/Companies');
const Projects = require('../../models/Projects');
const Users = require('../../models/Users');
const UserTypes = require('../../models/normalizations/UserTypes');
const ProjectTypes = require('../../models/normalizations/ProjectTypes');

const router = express.Router();

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
				res.status(200).json(addedProject);
			}
		);
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
		const projToUpdate = await Projects.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				companyID: req.body.companyName._id,
				projectName: req.body.projectName,
				projectTypeID: req.body.projectType._id
			}
		);

		// Types of IDs are different one is ObjectID and other is string.
		if (projToUpdate._id == req.body._id) {
			const updProj = await Projects.findById(projToUpdate._id);
			Projects.populate(
				updProj,
				[
					{ path: 'companyID', select: 'companyName' },
					{ path: 'projectTypeID' }
				],
				(err, updatedProject) => {
					if (err) throw err;
					return res.status(200).json(updatedProject);
				}
			);
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

// @route    GET api/getProjectNames/:currentUser
// @desc     Get all project Names for DropDown Select
// @access   Private
router.get('/getProjectNames/:currentUser', auth, async (req, res) => {
	try {
		// Method 1 Begins: Fetch using Aggregate >>>>
		const projectsList = await Companies.aggregate([
			{
				$match: {
					companyOwner: mongoose.Types.ObjectId(req.params.currentUser)
				}
			},
			{
				$lookup: {
					from: 'tms_projects',
					localField: '_id',
					foreignField: 'companyID',
					as: 'projectDetails'
				}
			},
			{
				$project: {
					projectDetails: {
						_id: 1,
						projectName: 1
					}
				}
			}
		]);

		let projectNames = new Array();
		projectsList.map(compProj =>
			compProj.projectDetails.map(project => projectNames.push(project))
		);
		// Method 1 Ends <<<<

		// // Method 2 Begins >>>>
		// const currentUsersCompanySet = new Set();
		// const compList = await Companies.find({
		// 	companyOwner: req.params.currentUser
		// }).select('id');
		// compList.map(company => currentUsersCompanySet.add(company._id));
		// const currentUsersCompanyArray = Array.from(currentUsersCompanySet);
		// const projectNames = await Projects.find({
		// 	companyID: { $in: currentUsersCompanyArray }
		// }).select('projectName');
		// // Method 2 Ends <<<<
		res.status(200).json(projectNames);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/project/
// @desc     Get all projects
// @access   Private
router.get('/:currentUser', auth, async (req, res) => {
	try {
		// Without Aggregate Begins >>>>
		const companiesList = await Companies.find({
			companyOwner: req.params.currentUser
		}).select('id');

		let compIdList = new Array();
		companiesList.map(company => compIdList.push(company.id));

		let projectsList = await Projects.find({
			companyID: {
				$in: compIdList
			}
		})
			.populate('companyID', 'companyName')
			.populate('projectTypeID', 'projectType')
			.populate([
				{
					path: 'teamMembers.memberID',
					model: Users,
					select: 'firstName lastName userEmail'
				},
				{ path: 'teamMembers.roleInProject', model: UserTypes, select: '-__v' }
				// {
				// 	path: 'teamMembers.memberID',
				// 	populate: { path: 'userType', model: UserTypes }
				// }
			]);
		// Without Aggregate Ends <<<<

		// // Fetch using Aggregate function Begins >>>>
		// // Didn't work: Data fetched but very difficult to map/collate
		// let compProjList = await Companies.aggregate([
		// 	{
		// 		$match: {
		// 			companyOwner: mongoose.Types.ObjectId(req.params.currentUser)
		// 		}
		// 	},
		// 	{
		// 		$lookup: {
		// 			from: 'tms_projects',
		// 			localField: '_id',
		// 			foreignField: 'companyID',
		// 			as: 'projectDetails'
		// 		}
		// 	},
		// 	{
		// 		$project: {
		// 			companyName: 1,
		// 			projectDetails: {
		// 				_id: 1,
		// 				projectName: 1,
		// 				projectTypeID: 1
		// 			}
		// 		}
		// 	}
		// ]);

		// await Projects.populate(
		// 	compProjList,
		// 	[
		// 		{
		// 			// path: 'projectDetails',
		// 			// populate: {
		// 			// 	path: 'projectTypeID',
		// 			// 	model: ProjectTypes
		// 			// }
		// 			path: 'projectDetails.projectTypeID',
		// 			model: ProjectTypes,
		// 			select: 'projectType'
		// 		}
		// 	],
		// 	(err, resultArray) => {
		// 		if (err) throw err;
		// 		projectsList = resultArray;
		// 		// return res.status(200).json({ projectsList });
		// 	}
		// );
		// // Fetch using Aggregate function Ends <<<<

		res.status(200).json(projectsList);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
