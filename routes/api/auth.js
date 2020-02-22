const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Users = require('../../models/Users');
const UserTypes = require('../../models/normalizations/UserTypes');
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
            
            if (err) throw (err);
            
            bcrypt.hash("abc123", salt, async function(err, hash) {
                
                if (err) throw (err);

                const hasAdmin = await Users.find({});
                
                if (hasAdmin.length === 0) {
                    const savedUserTypes = await UserTypes.insertMany([
                        { userType: 'Admin' },
                        { userType: 'Developer' },
                        { userType: 'Manager' },
                        { userType: 'Team Lead' },
                        { userType: 'User' }
                    ]);

                    const savedCompanyTypes = await CompanyTypes.insertMany([
                        {companyType: 'Information Technology'},
                        {companyType: 'Telecommunication'},
                        {companyType: 'Automobile'},
                        {companyType: 'Pharmacy'},
                        {companyType: 'Textile'}
                    ]);

                    const savedProjectTypes = await ProjectTypes.insertMany([
                        {projectType: 'Website'},
                        {projectType: 'Web App'},
                        {projectType: 'Content Management System'},
                        {projectType: 'Software'},
                        {projectType: 'Mobile App'}
                    ]);
                    
                    const user = new Users({
                        firstName: 'Vinayak',
                        lastName: 'Sharma',
                        userName: 'admin123',
                        userPass: hash,
                        userType: savedUserTypes[0]._id,
                        userEmail: 'vinayak252@gmail.com',
                    });
                    const createdUser = await user.save();
                    return res.status(200).json({ 
                        savedUserTypes,
                        savedCompanyTypes,
                        createdUser,
                        savedProjectTypes
                    });
                } else {
                    return res.status(400).send(hasAdmin);
                }
            });
        });
    } catch (err) {
        res.status(500).send(err);
    }

});


// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
    '/login',
    [
        check('un', 'Username is required.').exists().not().isEmpty(),
        check('up', 'Password is required.').exists().isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { un, up } = req.body;

        try {

            let user = await Users.findOne({ userName: un });

            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(up, user.userPass);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const payload = {
                user: {
                id: user.id
                }
            };

            jwt.sign(
                payload, 
                config.get('jwtSecret'), 
                { expiresIn: 3600 }, 
                (err, token) => {
                    if (err) throw err;
                    return res.json({ token, isAuthenticated: true });
                }
            );

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);


// @route    GET api/auth
// @desc     Get User Data from token
// @access   Private
router.get('/', auth, async (req, res) => {
   
    try {
        const user = await Users.findById(req.user.id).select('-userPass');
        return res.json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;