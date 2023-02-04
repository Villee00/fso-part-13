const jwt = require("jsonwebtoken");
const {SECRET} = require("./config");

const verifyToken = (req, res, next) => {
    const auth = req.headers["authorization"]
    if (!auth) {
        res.code(400).json({error: "Authorization failed"})
    }
    const token = auth.split(' ')[1]

    try {
        req.user = jwt.verify(token, SECRET)
        next()
    } catch (err) {
        return res.status(401).json({
            error: 'failed to verify token'
        })
    }
}

module.exports = {verifyToken}