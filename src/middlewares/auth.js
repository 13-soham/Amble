const JWT = require("jsonwebtoken");
const { User } = require("../model/user");

const handleAuth = async (req, res, next) => {
    try {
        // read the token from the req.cookies
        const { token } = req.cookies;

        // validate the token
        if (!token) {
            throw new Error("please login first");
        }
        const decodeData = JWT.verify(token, "Secrect@123");
        const { id } = decodeData;

        // find the user
        const user = await User.findById({ _id: id });
        if (!user) {
            throw new Error("user does not exist");
        }

        // attach the user in the request body and sends back
        req.user = user;
        next();
        
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

module.exports = { handleAuth };