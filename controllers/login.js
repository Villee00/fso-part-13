const router = require('express').Router()
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const {SECRET} = require("../util/config");
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    const body = req.body

    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    if (user && await bcrypt.compare(body.password, user.password)) {
        let token = jwt.sign({
            username: user.username,
            id: user.id
        }, SECRET)
        res.status(200).send({token, username: user.username, name: user.name})
    } else {
        res.status(401).json({
            error: "Username or password is wrong"
        })
    }
})

module.exports = router