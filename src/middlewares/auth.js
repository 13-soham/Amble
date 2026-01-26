const userAuth = (req, res, next) => {
    let token = Number(req.params.id);
    let AuthorizedToken = 9432
    token === AuthorizedToken ? next() : res.status(401).send("Unauthorized id detected");
}

module.exports = { userAuth };