const express = require("express");
const projectServices = require("./project.services");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
exports.add = async (req, res, next) => {
    try {
        return await projectServices.addService(req, res, next);
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
exports.getAll = async (req, res, next) => {
    try {
        return await projectServices.getAllService(req, res, next);
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
exports.getOne = async (req, res, next) => {
    try {
        return await projectServices.getOneService(req, res, next);
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
exports.update = async (req, res, next) => {
    try {
        return await projectServices.updateService(req, res, next);
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ message: error.message });
        next(error);
    }
};
