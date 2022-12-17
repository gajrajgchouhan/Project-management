const express = require("express");
const projectServices = require("./project.services");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
exports.addProject = async (req, res, next) => {
    try {
        return await projectServices.addProjectService(req, res, next);
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ message: error.message });
        next(error);
    }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
exports.getAllProjects = async (req, res, next) => {
    try {
        return await projectServices.getAllProjectsService(req, res, next);
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ message: error.message });
        next(error);
    }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
exports.getOneProject = async (req, res, next) => {
    try {
        return await projectServices.getOneProjectService(req, res, next);
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ message: error.message });
        next(error);
    }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
exports.updateTask = async (req, res, next) => {
    try {
        return await projectServices.updateTaskService(req, res, next);
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ message: error.message });
        next(error);
    }
};
