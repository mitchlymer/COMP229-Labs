const User = require('../models/user.model');

const formatUser = (user) => {
    return {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        created: user.created,
        updated: user.updated,
        id: user._id
    };
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
        req.body.updated = Date.now();

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        res.json({
            success: true,
            message: 'User updated successfully.'
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