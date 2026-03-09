const mongoose = require("mongoose");

const connectionReqSchema = mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,          // fromUserId
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,           // toUserId
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


// indexing
connectionReqSchema.index(
    { senderId : 1, receiverId : 1 },
    { unique : true }
);


// .pre() middleware use for runs first before anything happens in mongoose, use normal function
connectionReqSchema.pre("save", function(){
    if(this.senderId.toString() === this.receiverId.toString()){
        throw new Error("Invalid request");
    }
});

const ConnectionReq = mongoose.model("ConnectionReq", connectionReqSchema);
module.exports = { ConnectionReq };