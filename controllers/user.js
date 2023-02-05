const router = require('express').Router()
const bcrypt = require('bcrypt')

const {User, Blog} = require('../models')
const {SALT} = require("../util/config");

const findUser = async (req, res, next) => {
    req.user = await User.findOne({
        where: {
            username: req.params.username
        },
    })

    if (!req.user) {
        res.send(404).json({error: 'Not found'})
    }
    next()
}

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: [
            {
                model: Blog,
                attributes: ['title', 'url', 'likes']
            },
            {
                model: Blog,
                as: 'readingList',
                through: {
                    attributes: ['read']
                }
            }]
    })
    res.json(users)
})

router.post('/', async (req, res) => {
    const body = req.body

    let user = await User.findOne({
        where: {
            username: body.username
        }
    })

    if (user) {
        res.status(400).json({
            error: "Username is already taken"
        }).end()
    } else {
        body.password = await bcrypt.hash(body.password, SALT)

        user = await User.create(body)
        res.json(user.toJSON())
    }
})

router.put('/:username', findUser, async (req, res) => {
    req.user.username = req.body.username
    await req.user.save()
    res.json(req.user)
})

module.exports = router