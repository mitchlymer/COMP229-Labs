const Service = require('../models/service.model');

const formatService = (service) => {
    return {
        title: service.title,
        description: service.description,
        id: service._id
    };
};

exports.getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find();

        res.json({
            success: true,
            message: 'Services list retrieved successfully.',
            data: services.map(formatService)
        });
    } catch (err) {
        next(err);
    }
};

exports.getServiceById = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found.'
            });
        }

        res.json({
            success: true,
            message: 'Service retrieved successfully.',
            data: formatService(service)
        });
    } catch (err) {
        next(err);
    }
};

exports.addService = async (req, res, next) => {
    try {
        const service = await Service.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Service added successfully.',
            data: formatService(service)
        });
    } catch (err) {
        next(err);
    }
};

exports.updateService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found.'
            });
        }

        res.json({
            success: true,
            message: 'Service updated successfully.'
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found.'
            });
        }

        res.json({
            success: true,
            message: 'Service deleted successfully.'
        });
    } catch (err) {
        next(err);
    }
};