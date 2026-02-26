// Amble: Implies a relaxed, casual way of meeting people.
// Amble — slow connections, real people


// Handle a demo auth for all http request and create a signup route for POST request for valid user
const express = require("express");
// const { handleAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
// const { User } = require("./model/user");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");

// app.use("/:userId", handleAuth);
app.use(express.json());    // middleware to parse the json data to js object
app.use(cookieParser());   // parse the JWT


// importing routing
app.use("/", authRouter);
app.use("/", profileRouter);


connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`app listen at port ${port}`);
        });
    })
    .catch((err) => {
        console.error(err.message);
    });