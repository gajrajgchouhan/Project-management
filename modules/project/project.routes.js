const express = require("express");
const prefix = "/projects";
const controller = require("./project.controller");
const utils = require("./project.utils");

/**
 *
 * @param {express.Application} app
 */
module.exports = (app) => {
    app.post(`${prefix}/add`, utils.jwtMiddleware, controller.add);
    app.post(`${prefix}/getAll`, utils.jwtMiddleware, controller.getAll);
    app.post(`${prefix}/getOne`, utils.jwtMiddleware, controller.getOne);
    app.post(`${prefix}/update`, utils.jwtMiddleware, controller.update);
};
