// Amble: Implies a relaxed, casual way of meeting people.
// Amble — slow connections, real people


const express = require("express");
// const { handleAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
// const { User } = require("./model/user");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");


// app.use("/:userId", handleAuth);
app.use(express.json());    // middleware to parse the json data to js object
app.use(cookieParser());   // parse the JWT


// importing routing
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`app listen at port ${port}`);
        });
    })
    .catch((err) => {
        console.error(err.message);
    });