// Amble: Implies a relaxed, casual way of meeting people.
// Amble — slow connections, real people


// Handle a demo auth for all http request and create a signup route for POST request for valid user
const express = require("express");
const { handleAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
const { User } = require("./model/user");
const { validateSignup } = require("./helper/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

// app.use("/:userId", handleAuth);
app.use(express.json());    // middleware to parse the json data to js object
app.use(cookieParser());   // parse the JWT
 

// signup user
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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
            // add this token to the cookie and send response back to the server
            res.cookie("token", "kjhasjdiufhnrwkrn");

            res.json({ message: "Login Successful" });
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


// get profile
app.get("/getProfile", (req, res) => {
    try {
        const cookies = req.cookies;

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
});


// get name having age > 30
app.get("/filter", async (req, res) => {
    try {
        const filterUser = await User.find(
            { age: { $gt: 30 } },
            { firstName: 1, lastName: 1, age: 1, email: 1, _id: 0 }
        );
        if (filterUser.length > 0) res.send(filterUser);
        else res.status(404).send("user not found");
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
});

// delete user by userId
app.delete("/user", async (req, res) => {
    let userId = req.body.userId;

    try {
        const deleteUser = await User.findByIdAndDelete({ _id: userId });
        if (!deleteUser) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).send("user deleted successfully");

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
});

// update user by userId
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        let allowUpdates = ["gender", "interest", "about", "photoUrl"];
        const isUpdateAllow = Object.keys(req.body).every((key) => allowUpdates.includes(key));   // .every() returns true and false
        if (!isUpdateAllow) {
            throw new Error("Invaild filed selected");
        }
        if (req.body?.interest.length > 7) {
            throw new Error("interest cannot have more than 7");
        }

        const updateUser = await User.findByIdAndUpdate(
            { _id: userId },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "user updated succesfully",
            updateUser: updateUser
        });
    } catch (err) {
        res.status(404).json({
            msg: err.message
        })
    }
});

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`app listen at port ${port}`);
        });
    })
    .catch((err) => {
        console.error(err.message);
    });





// update user from database via Email
// app.patch("/user", async (req, res)=>{
//     let oldEmail = req.body.email;
//     try {
//         await User.findOneAndUpdate(
//             {email : oldEmail},
//             req.body,
//             {
//                 new : true,
//                 runValidators : true
//             }
//         );
//         res.status(200).json({
//             message : "user update succesfully"
//         })
//     } catch (err) {
//         res.status(404).json({
//             message : err.message
//         })
//     }
// });

// // Feed APT : GET / Feed → get all the users from the database
// app.get("/feed", async (req, res) => {
//     try {
//         const allUser = await User.find({});
//         if (allUser.length > 0) res.send(allUser);
//         else res.status(404).send("user not found");
//     } catch (err) {
//         res.status(404).json({
//             message: err.message
//         })
//     }
// });