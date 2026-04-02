// Amble: Implies a relaxed, casual way of meeting people.
// Amble — slow connections, real people


const express = require("express");
// const { handleAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
// const { User } = require("./model/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;


// It reads .env file and loads all the variables into process.env so code can access them.
const dotenv = require("dotenv");
dotenv.config({ path : "./src/.env" });

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");


app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));
// app.use("/:userId", handleAuth);
app.use(express.json());    // middleware to parse the json data to js object
app.use(cookieParser());   // parse the JWT


// importing routing
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`app listen at port ${port}`);
        });
    })
    .catch((err) => {
        console.error(err.message);
    });