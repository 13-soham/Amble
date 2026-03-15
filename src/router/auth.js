const express = require("express");
const authRouter = express.Router();

const { User } = require("../model/user");
const { validateSignup } = require("../helper/validation");
const bcrypt = require("bcrypt");


// signup user
authRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, age, email, password, gender, interest, about, photoUrl } = req.body;
    try {
        // validation of data
        validateSignup(req);

        // encrypt the password
        const hashPassword = await bcrypt.hash(password, 10);

        // creating the new instance of user Model
        const newUser = await User.create({
            firstName, lastName, age, email, gender, interest, about, photoUrl,
            password: hashPassword
        });

        res.status(201).json({
            message: "user is created",
            user: newUser
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
});



// login user
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // check that email is in the database or not
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid Email or Password");
        }

        // compare password
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {

            // create a JWT Token
            const token = await user.getJWT();

            // add this token to the cookie and send response back to the server
            res.cookie("token", token, {
                httpOnly: true,           // secure: not accessible via JS
                secure: false,            // only true if using HTTPS
                sameSite: "lax",          // cross-port on localhost
                expires: new Date(Date.now() + 5 * 3600000)
            });

            res.json(
                { message: "Login Successful" }
            );
        }
        else {
            throw new Error("Invalid Email or Password");
        }

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
});


// logout
authRouter.post("/logout", async (req, res) => {
    res.clearCookie("token");
    res.send("logout succesfully");
});


module.exports = authRouter;