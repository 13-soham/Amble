const express = require("express");   // from C:/Users/soham/AppData/Local/Microsoft/TypeScript/5.9/node_modules/@types/express/index

const app = express();
const port = 8000;

// app.use("/test", (req, res)=>{
//     res.send("from test server");
// });

app.get("/user", (req, res)=>{
    res.send({
        name : "Bimal Mohanto",
        age : 57,
        email : "bilal@gmail.com"
    });
});

app.post("/user", (req, res)=>{
    // ... do database work
    res.send("DB added succesfully");
});

app.patch("/user", (req, res)=>{
    res.send("user updated succesfully");
})


app.listen(port, ()=>{
    console.log(`server listen at port ${port}`);
});