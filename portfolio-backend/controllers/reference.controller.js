const Reference = require('../models/reference.model');

const formatReference = (reference) => {
    return {
        name: reference.name,
        testimonial: reference.testimonial,
        position: reference.position,
        company: reference.company,
        id: reference._id
    };
};

exports.getAllReferences = async (req, res, next) => {
    try {
        const references = await Reference.find();

        res.json({
            success: true,
            message: 'References list retrieved successfully.',
            data: references.map(formatReference)
        });
    } catch (err) {
        next(err);
    }
};

exports.getReferenceById = async (req, res, next) => {
    try {
        const reference = await Reference.findById(req.params.id);

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: 'Reference not found.'
            });
        }

        res.json({
            success: true,
            message: 'Reference retrieved successfully.',
            data: formatReference(reference)
        });
    } catch (err) {
        next(err);
    }
};

exports.addReference = async (req, res, next) => {
    try {
        const reference = await Reference.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Reference added successfully.',
            data: formatReference(reference)
        });
    } catch (err) {
        next(err);
    }
};

exports.updateReference = async (req, res, next) => {
    try {
        const reference = await Reference.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: 'Reference not found.'
            });
        }

        res.json({
            success: true,
            message: 'Reference updated successfully.'
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteReference = async (req, res, next) => {
    try {
        const reference = await Reference.findByIdAndDelete(req.params.id);

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: 'Reference not found.'
            });
        }

        res.json({
            success: true,
            message: 'Reference deleted successfully.'
        });
    } catch (err) {
        next(err);
    }
};