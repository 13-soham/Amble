const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("database is connected");
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = { connectDB };


/*

mongodb://NamasteNodeJs:<db_password>@ac-egu28td-shard-00-00.exkc5xt.mongodb.net:27017,ac-egu28td-shard-00-01.exkc5xt.mongodb.net:27017,ac-egu28td-shard-00-02.exkc5xt.mongodb.net:27017/?ssl=true&replicaSet=atlas-10gppm-shard-0&authSource=admin&appName=NamasteNodejs

mongodb://NamasteNodeJs:TyC04SJFdhZfxH6Z@ac-egu28td-shard-00-00.exkc5xt.mongodb.net:27017,ac-egu28td-shard-00-01.exkc5xt.mongodb.net:27017,ac-egu28td-shard-00-02.exkc5xt.mongodb.net:27017/AmbleDb?ssl=true&replicaSet=atlas-10gppm-shard-0&authSource=admin&appName=NamasteNodejs

*/


// TyC04SJFdhZfxH6Z

// mongodb+srv://NamasteNodeJs:TyC04SJFdhZfxH6Z@namastenodejs.exkc5xt.mongodb.net/Amble_db