const express = require("express");
const prefix = "/projects";
const controller = require("./project.controller");

/**
 *
 * @param {express.Application} app
 */
module.exports = (app) => {
    app.post(`${prefix}/add`, controller.login);
    app.post(`${prefix}/getAll`, controller.register);
};
