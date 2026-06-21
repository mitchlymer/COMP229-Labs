const Project = require('../models/project.model');

const formatProject = (project) => {
    return {
        title: project.title,
        completion: project.completion,
        description: project.description,
        image: project.image,
        id: project._id
    };
};

exports.getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();

        res.json({
            success: true,
            message: 'Projects list retrieved successfully.',
            data: projects.map(formatProject)
        });
    } catch (err) {
        next(err);
    }
};

exports.getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found.'
            });
        }

        res.json({
            success: true,
            message: 'Project retrieved successfully.',
            data: formatProject(project)
        });
    } catch (err) {
        next(err);
    }
};

exports.addProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Project added successfully.',
            data: formatProject(project)
        });
    } catch (err) {
        next(err);
    }
};

exports.updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found.'
            });
        }

        res.json({
            success: true,
            message: 'Project updated successfully.'
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found.'
            });
        }

        res.json({
            success: true,
            message: 'Project deleted successfully.'
        });
    } catch (err) {
        next(err);
    }
};