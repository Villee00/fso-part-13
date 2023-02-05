const jwt = require("jsonwebtoken");
const {SECRET} = require("./config");
const {Tokens, User} = require("../models");

const verifyToken = async (req, res, next) => {
    const auth = req.headers["authorization"]
    if (!auth) {
        res.code(400).json({error: "Authorization failed"})
    }
    const token = auth.split(' ')[1]

    req.token = await Tokens.findByPk(token)
    if (!req.token) {
        return res.status(401).json({
            error: 'Token is not valid'
        })
    }
    try {
        req.user = jwt.verify(token, SECRET)

        const user = await User.findByPk(req.user.id)
        if (user.disabled) {
            await req.token.destroy()
            return res.status(401).json({
                error: 'Your account has been disabled'
            })
        }
        next()
    } catch (err) {
        return res.status(401).json({
            error: 'failed to verify token'
        })
    }
}

module.exports = {verifyToken}