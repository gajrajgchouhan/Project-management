const express = require("express");
const { Validator } = require("express-json-validator-middleware");
const prefix = "/auth";
const controller = require("./auth.controller");

/**
 *
 * @param {express.Application} app
 */
module.exports = (app) => {
    const { validate } = new Validator();

    app.post(
        `${prefix}/login`,
        validate({
            body: {
                type: "object",
                properties: {
                    username: { type: "string" },
                    password: { type: "string" },
                },
                required: ["username", "password"],
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
