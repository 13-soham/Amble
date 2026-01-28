const handleAuth = (req, res, next)=>{
    let token = req.params.userId;
    let validToken = 9432;

    validToken === Number(token) ? next() : res.status(500).send("authentication error");
}

module.exports = { handleAuth };