const mongoose = require("mongoose");

const connectDB = async ()=>{
    mongoose.connect("mongodb+srv://NamasteNodeJs:TyC04SJFdhZfxH6Z@namastenodejs.exkc5xt.mongodb.net/Amble_db");
    console.log("database is connected");
}

module.exports = { connectDB };