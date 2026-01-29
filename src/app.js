// Amble: Implies a relaxed, casual way of meeting people.
// Amble — slow connections, real people


// Handle a demo auth for all http request and create a signup route for POST request for valid user
const express = require("express");
const { handleAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
const { User } = require("./model/user");
const app = express();
const port = 8000;

// app.use("/:userId", handleAuth);
app.use(express.json());    // middleware to parse the json data to js object

app.post("/signup", async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            message: "user is created",
            user: newUser
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});



// Feed APT : GET / Feed → get all the users from the database
app.get("/feed", async (req, res) => {
    try {
        const allUser = await User.find({});
        if (allUser.length > 0) res.send(allUser);
        else res.status(404).send("user not found");
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
        const deleteUser = await User.findByIdAndDelete({userId : userId});
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



// update user from database
app.patch("/user", async (req, res)=>{
    let oldEmail = req.body.email;
    try {
        await User.findOneAndUpdate(
            {email : oldEmail}, 
            req.body,
            {
                new : true,
                runValidators : true
            }
        ); 
        res.status(200).json({
            message : "user update succesfully"
        })
    } catch (err) {
        res.status(404).json({
            message : err.message
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