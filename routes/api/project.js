const express = require('express');
const auth = require('../../middleware/auth');

const Projects = require('../../models/Projects');
const Users = require('../../models/Users');
const UserTypes = require('../../models/normalizations/UserTypes');
const CompanyTypes = require('../../models/normalizations/CompanyTypes');

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
        const projectsList = await Projects
                                    .find({})
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
router.get('/getAllProjectTypes', auth, async (req, res)=>{
    try {
        const userTypes = await UserTypes.find({ userType: { $ne: 'Admin' } });
        res.status(200).json(userTypes);
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
        const user = new Users(req.body);
        
        const addedUser = await user.save();

        // Could be fetched from the req.body itself to improve performace but will be less secure
        const usrTyp = await UserTypes.findOne({ _id: addedUser.userType }).select('userType');
        addedUser.userType = usrTyp;

        // Could be fetched from the req.body itself to improve performace but will be less secure
        const cmpType = await CompanyTypes.findOne({ _id: addedUser.companyType }).select('companyType');
        addedUser.companyType = cmpType;
        
        res.status(200).json(addedUser);
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

// @route    DELETE api/project/deleteProject/id
// @desc     Delete an existing Project
// @access   Private
router.delete('/deleteProject/:id', auth, async (req, res) => {
    try {        
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        return res.status(200).json(deletedUser._id);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;