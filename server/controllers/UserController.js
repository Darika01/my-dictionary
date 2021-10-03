const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'randomString', { expiresIn: 10000 }, (err, token) => {
            if (err) throw err;
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.status(200).json({
                token
            });
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error in Saving');
    }
};

const login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { email, username, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user)
            return res.status(400).json({
                message: 'User Not Exist'
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: 'Incorrect Password !'
            });

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'randomString', { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.status(200).json({
                access_token: token
            });
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

const logout = async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        res.clearCookie('nToken');
        res.status(200).json({ message: 'User logout', user });
    } catch (e) {
        res.send({ message: 'Error in Fetching user' });
    }
};

const getById = async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication

        if (req.user) {
            const user = await User.findById(req.user.id);
            return res.json(user);
        }
        res.status(401).json({ message: 'UNAUTHORIZED' });
    } catch (e) {
        res.send({ message: 'Error in Fetching user' });
    }
};

module.exports = {
    signup,
    login,
    logout,
    getById
};
