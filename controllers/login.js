const router = require('express').Router()
const {User, Tokens} = require('../models')
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
        if (user.disabled) {
            return res.status(400).send({error: 'This account has been disabled'})
        }
        let token = jwt.sign({
            username: user.username,
            id: user.id
        }, SECRET)
        const tokenObject = Tokens.build({token})
        await tokenObject.save()
        res.status(200).send({token, username: user.username, name: user.name})
    } else {
        res.status(401).json({
            error: "Username or password is wrong"
        })
    }
})

module.exports = router