const express = require("express");
const userRouter = express.Router();

const { handleAuth } = require("../middlewares/auth");
const { ConnectionReq } = require("../model/connectionReq");
const { User } = require("../model/user");

const userFields = ["firstName", "lastName", "age", "gender", "about", "photoUrl", "interest", "isActive"];


// get all the pending request
userRouter.get("/user/request/received", handleAuth, async (req, res)=>{
    // show me the matches where I am act as a receiverId, 
    // cuz someone send me the request where they are the sender and I am the receiver
    // now I just want to retrieve the data from the database
    
    try {
        const loggedUser = req.user._id;
        const pendingReq = await ConnectionReq.find({
            receiverId : loggedUser,
            status : "interested"
        }).populate("senderId", userFields);

        if(pendingReq.length === 0){
            return res.status(200).json({
                message : "No request received"
            });
        }

        res.status(200).json({
            message : "Your Request",
            pendingReq
        });
        
    } catch (err) {
        res.status(404).json({
            msg : err.message
        });
    }
});


// show all my matched connections
userRouter.get("/user/connections", handleAuth, async (req, res)=>{
    try {

        // suppose I am user A and A → B => accepted
        // and, C → A => accepted, also
        // means loggeduser can be sender or receiver but status should accepted
        // after fetch connections, it must show the opposite user profile

        const loggedUser = req.user._id;
        const showConnections = await ConnectionReq.find({
            $or : [
                {
                    receiverId : loggedUser,
                    status : "accepted"
                },{
                    senderId : loggedUser,
                    status : "accepted"
                }
            ]
        })
        .populate("receiverId",userFields)
        .populate("senderId", userFields);

        // if senderId is matched the loggedUserId then return receiverId, else retuen senderId
        const finalConnections = showConnections.map((val) => {
            if(val.senderId._id.toString() === loggedUser.toString()) return val.receiverId;
            else return val.senderId;
        });

        if(showConnections.length === 0){
            return res.status(200).json({
                message : "No matches yet."
            });
        }

        res.status(200).json({
            message : "matched connections",
            finalConnections
        });
        
    } catch (err) {
        res.status(404).json({
            msg : err.message
        });
    }
});



// feed API
userRouter.get("/user/feed", handleAuth, async(req, res)=>{
    try {
        const loggedUser = req.user._id;
        const allUser = await ConnectionReq.find({
            $or : [
                {
                    senderId : loggedUser
                },{
                    receiverId : loggedUser
                }
            ]
        }).select("senderId receiverId");

        let hideUsers = new Set();
        allUser.forEach((e)=>{
            hideUsers.add(e.senderId.toString());
            hideUsers.add(e.receiverId.toString());
        });

        const feedUsers = await User.find({
            $and : [
                { _id : { $ne : loggedUser } },
                { _id : { $nin : Array.from(hideUsers) } }
            ]
        })
        .select(userFields);

        res.status(200).json({
            feedUsers
        });

    } catch (err) {
        res.status(400).json({
            msg : err.message
        });
    }
});

module.exports = userRouter;