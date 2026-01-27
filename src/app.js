// Amble: Implies a relaxed, casual way of meeting people.
// Amble — slow connections, real people

const express = require("express");
const { userAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
const { User } = require("./model/user");
const app = express();
const port = 8000;

// Handle a demo Auth Middleware for all HTTP request...
// app.use("/user/:id", userAuth);

// app.get("/user/:id/getProfile", (req, res)=>{
//     // throw new Error("lalalala");
//     res.send({
//         name : "Admin Roy",
//         isMale : true
//     });
// });

// app.get("/user/:id/deleteProfile", (req, res)=>{
//     res.send("user deleted");
// });


// create a /signup API
// method : 01
// app.post("/signup", async (req, res)=>{
//     let newUser = new User({
//         firstName : "Anmol",
//         lastName : "Singha",
//         email : "anmol123@gmail.com",
//         password : "hoster1010",
//         age : 43,
//         gender : "male"
//     });

//     try {
//         await newUser.save();
//         res.status(201).json({
//             message : "user created",
//             user : newUser
//         });
//     } catch (err) {
//         res.status(400).json({
//             message : err
//         });
//     }
// });

// method : 02
app.post("/signup", async (req, res) => {
    try {
        const newUser = await User.create({
            firstName: "Prabhas",
            lastName: "Shubhramayam",
            email: "bahubali12345@gmail.com",
            password: "adipurushXbahubali108",
            age: 49,
            gender: "male"
        })
        res.status(201).json({
            message: "user created succesfully",
            user: newUser
        });
    } catch (err) {
        res.status(401).send(err.message);
    }
});

connectDB()
    .then(() => {
        console.log("database Connection Established.");
        app.listen(port, () => {
            console.log(`app listen in port ${port}`);
        });
    })
    .catch((err) => {
        console.error(err.message);
    });