const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const formatUser = (user) => {
    return {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        created: user.created,
        updated: user.updated,
        id: user._id
    };
};

exports.signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required.'
            });
        }

        const user = await User.findOne({ email: email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.json({
            success: true,
            message: 'Sign in successful.',
            data: {
                token: token,
                user: formatUser(user)
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.json({
            success: true,
            message: 'Users list retrieved successfully.',
            data: users.map(formatUser)
        });
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        res.json({
            success: true,
            message: 'User retrieved successfully.',
            data: formatUser(user)
        });
    } catch (err) {
        next(err);
    }
};

exports.addUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            message: 'User added successfully.',
            data: formatUser(user)
        });
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        if (req.body.firstname !== undefined) {
            user.firstname = req.body.firstname;
        }

        if (req.body.lastname !== undefined) {
            user.lastname = req.body.lastname;
        }

        if (req.body.email !== undefined) {
            user.email = req.body.email;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        user.updated = Date.now();

        await user.save();

        res.json({
            success: true,
            message: 'User updated successfully.',
            data: formatUser(user)
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        res.json({
            success: true,
            message: 'User deleted successfully.'
        });
    } catch (err) {
        next(err);
    }
};