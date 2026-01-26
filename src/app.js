const express = require("express");

const app = express();
const port = 8000;

// // req.query
// app.get("/user", (req, res)=>{
//     // route handlers
//     const { Id, ismale } = req.query;
//     res.send({
//         Id,
//         ismale
//     });
// });

// // req.params → dynamic routing
// app.get("/data/:Id/:ismale", (req, res)=>{
//     const val = req.params;
//     res.send(val);
// });


// // there can be multiple route handlers
// app.use("/user", (req, res, next)=>{
//     // res.send("from route01");    // res.send() ends the request response cycle, so use next()
//     console.log("from route01");
//     next();
//     res.send("from route01");
//     // When next() is called, Express passes control to the next route handler, but the current function continues executing. If the next handler sends a response, any later res.send() causes an error because headers are already sent
// }, (req, res)=>{
//     res.send("from route02");
// });

// app.use("/", (req, res, next)=>{
//     // middleware
//     console.log("it is a 1st middleware");
//     next();
// });

// app.use("/user", (req, res, next)=>{
//     // middleware
//     console.log("it is 2nd middleware");
//     next();
// }, (req, res, next)=>{
//     // route handler
//     console.log("it is the route handler");
//     res.send("respond sends back");
// });



// Handle a demo Auth Middleware for all HTTP request...
const { userAuth } = require("./middlewares/auth");
app.use("/user/:id", userAuth);

app.get("/user/:id/getProfile", (req, res)=>{
    res.send({
        name : "Admin Roy",
        isMale : true
    });
});

app.get("/user/:id/deleteProfile", (req, res)=>{
    res.send("user deleted");
});


app.listen(port, ()=>{
    console.log(`app listen in port ${port}`);
});