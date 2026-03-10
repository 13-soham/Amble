const express = require("express");
const requestRouter = express.Router();

const { handleAuth } = require("../middlewares/auth");
const { ConnectionReq } = require("../model/connectionReq");
const { User } = require("../model/user");


// sending connection request
requestRouter.post("/request/send/:status/:userId", handleAuth, async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.userId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)) throw new Error("Invalid Status Type.");


        // check my receiverId is in my DB or not
        const exsistData = await User.findOne({ _id : receiverId});
        if(!exsistData) throw new Error("User does not exist.");


        // check that senderId and receiverId are same or not
        // if(senderId.toString() === receiverId) throw new Error("Invalid request.");   // It can write this check in DB level too


        // check that A → B or B → A connection already exist or not
        const checkDuplicateReq = await ConnectionReq.findOne({
            $or : [
                { senderId, receiverId },
                { senderId : receiverId, receiverId : senderId }
            ]
        });   // it will return either required document or null

        if(checkDuplicateReq) throw new Error("Request already sent.");

        // save connection request in db
        const savedData = await ConnectionReq.create({
            senderId,
            receiverId,
            status
        });

        // const savedData = await connectionReq.save();   create already make save

        res.status(201).json({
            message: "request send succesfully",
            savedData
        });
    } catch (err) {
        res.status(400).json({
            msg : err.message
        })
    }
});


// receving connection request
requestRouter.post("/request/review/:status/:userId", handleAuth, async(req, res)=>{
    try {
        const loggedUser = req.user._id;
        const requestingUser = req.params.userId;
        const status = req.params.status;

        // checking allowing fields
        const allowStatus = ["accepted", "rejected"];
        if(!allowStatus.includes(status)) throw new Error("Invalid Status Type.");

        // A → B
        // B = logged in user
        // status = interested

        // check A should be in database
        // B cannot review it's own requrest
        const connectionReq = await ConnectionReq.findOne({
            senderId : requestingUser,
            receiverId : loggedUser,
            status : "interested"
        });

        if(!connectionReq) throw new Error("connection is not valid.");
        

        // after accepted or rejected user B cannot review again


        const savedUser = await ConnectionReq.updateOne({
            senderId : requestingUser,
            receiverId : loggedUser,
            status : "interested"
        }, {
            $set : {
                status : status
            }
        }, {
            new : true
        });


        const userA = await User.findOne({
            _id : requestingUser
        });
        
        res.status(201).json({
            message : `requested is ${status} between ${userA.firstName} and ${req.user.firstName} done.`,
            savedUser
        });
        
    } catch (err) {
        res.status(404).json({
            msg : err.message,
        })
    }
});




module.exports = requestRouter;