const express = require('express');
const { check, oneOf } = require('express-validator/check');

const UserController = require('../controllers/UserController');
const authJwt = require('../middleware/authJwt');

const router = express.Router();

router.post(
    '/user/signup',
    [
        check('username', 'Please Enter a Valid Username').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a valid password').isLength({
            min: 4
        })
    ],
    UserController.signup
);
router.post(
    '/user/login',
    [
        oneOf(
            [
                check('username', 'Please enter a valid username').not().isEmpty(),
                check('email', 'Please enter a valid email').isEmail()
            ],
            'Please enter username or email'
        ),
        check('password', 'Please enter a valid password').isLength({
            min: 4
        })
    ],
    UserController.login
);
router.get('/user/logout', authJwt, UserController.logout);
router.get('/user', authJwt, UserController.getById);

module.exports = router;
