const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const prefix = "/auth";
const controller = require("./auth.controller");
const { jwtMiddleware } = require("../project/project.utils");

/**
 *
 * @param {express.Application} app
 */
module.exports = (app) => {
    const { validate } = new Validator();

    app.get(`${prefix}/getProfile`, jwtMiddleware, controller.getProfile);
    app.post(
        `${prefix}/login`,
        validate({
            body: {
                type: "object",
                properties: {
                    email: { type: "string" },
                    password: { type: "string" },
                },
                required: ["email", "password"],
            },
        }),
        controller.login
    );
    app.post(
        `${prefix}/register`,
        validate({
            body: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    username: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                },
                required: ["name", "username", "email", "password"],
            },
        }),
        controller.register
    );
};
