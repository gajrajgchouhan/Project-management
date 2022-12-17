const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const authRoutes = require("./modules/auth/auth.routes");
const { ValidationError } = require("express-json-validator-middleware");

require("dotenv").config();

async function main() {
    await db.connectDB(process.env.DB);

    const app = express();
    const port = 5000;

    app.use(cors());

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    authRoutes(app);

    app.use((error, request, response, next) => {
        // Check the error is a validation error
        if (error instanceof ValidationError) {
            // Handle the error
            response.status(400).send({
                success: false,
                message: error.validationErrors.body.map((err) => err.message),
            });
            next();
        } else {
            // Pass error on if not a validation error
            next(error);
        }
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

main();
