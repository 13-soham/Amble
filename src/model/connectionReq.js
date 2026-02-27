const mongoose = require("mongoose");

const connectionReqSchema = mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : {
            values : ["ignored", "interested", "accepted", "rejected"],
            message : `{VALUE} is incorrect status type`                   // {VALUE} is a Mongoose template variable
        },
        default : "ignored"
    },
},{ timestamps : true });

const ConnectionReqModel = mongoose.model("ConnectionReq", connectionReqSchema);
module.exports = { ConnectionReqModel };