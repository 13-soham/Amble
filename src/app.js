const express = require("express");   // from C:/Users/soham/AppData/Local/Microsoft/TypeScript/5.9/node_modules/@types/express/index

const app = express();
const port = 8000;

app.get("/", (req, res)=>{
    res.send("hello from server");
});

app.use("/test", (req, res)=>{
    res.send("from test server");
});

app.get("/page/route", (req, res)=>{
    res.send("from nested server");
});

app.use("/page", (req, res)=>{
    res.send("from page server");
});



app.listen(port, ()=>{
    console.log(`server listen at port ${port}`);
});