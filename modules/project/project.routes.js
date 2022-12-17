const express = require("express");
const prefix = "/projects";
const controller = require("./project.controller");
const utils = require("./project.utils");

/**
 *
 * @param {express.Application} app
 */
module.exports = (app) => {
    app.post(`${prefix}/add`, utils.jwtMiddleware, controller.addProject);
    app.post(
        `${prefix}/getAll`,
        utils.jwtMiddleware,
        controller.getAllProjects
    );
    app.post(`${prefix}/getOne`, utils.jwtMiddleware, controller.getOneProject);
    app.post(
        `${prefix}/updateTask`,
        utils.jwtMiddleware,
        controller.updateTask
    );
};
