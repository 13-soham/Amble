const express = require("express");
const profileRouter = express.Router();

const { handleAuth } = require("../middlewares/auth");
const { validateUpdate } = require("../helper/validation");
const bcrypt = require("bcrypt");

// get profile
profileRouter.get("/profile/view", handleAuth, async (req, res) => {
    try {
        const user = req.user;
        res.json({
            message: user
        });

    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
});


// update user by userId
profileRouter.patch("/profile/edit", handleAuth, async (req, res) => {
    // validate updattion fields
    // if valid then update objects keys, after getting user from req.user
    try {

        validateUpdate(req);

        const loggedUser = req.user;

        // now we need to change loggedUser[key]
        Object.keys(req.body).forEach((key) => {
            loggedUser[key] = req.body[key];
        })

        await loggedUser.save();

        res.status(201).json({
            message: `${loggedUser.firstName} updated succesfully.`,
            updateUser: loggedUser
        });

    } catch (err) {
        res.status(400).json({
            msg: err.message
        })
    }
});


// change password if forgot
profileRouter.patch("/profile/password", handleAuth, async (req, res) => {
    // from req.body I need 2 things oldPassword, newPassword
    // check that hash oldpassword from req.body is same as req.user hash password
    // if same then loggedUser.password = newPassword
    // send response back for success

    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) throw new Error("Both passwords are required");

        const loggedUser = req.user;

        const validPassword = await bcrypt.compare(oldPassword, loggedUser.password);
        if (!validPassword) throw new Error("password is incorect.");

        loggedUser.password = await bcrypt.hash(newPassword, 10);

        await loggedUser.save();

        res.status(200).json({
            message: "password updated succesfully."
        });
    } catch (err) {
        res.status(400).json({
            msg: err.message
        })
    }

});


// delete profile
profileRouter.delete("/profile/delete", handleAuth, async (req, res) => {
    try {
        const { currPassword } = req.body;
        if (!currPassword) throw new Error("please give your password first.");

        const loggedUser = req.user;

        const validPassword = await bcrypt.compare(currPassword, loggedUser.password);
        if (!validPassword) throw new Error("password is incorect.");

        // no need to write { id : loggedUser._id } cuz loggedUser is document(product) not Model(factory)
        const deleteUser = await loggedUser.deleteOne();
        if(!deleteUser) throw new Error("user not found");
        
        res.status(200).send("user deleted successfully");

    } catch (err) {
        res.status(400).json({
            msg: err.message
        })
    }
});

module.exports = profileRouter;