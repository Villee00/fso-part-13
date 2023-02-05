const router = require('express').Router()
const bcrypt = require('bcrypt')

const {User, Blog} = require('../models')
const {SALT} = require("../util/config");
const {Op} = require("sequelize");


const findUserWithID = async (req, res, next) => {
    const where = {}

    if(req.query.read){
        where.read = req.query.read
    }
    req.user = await User.findByPk(req.params.id, {
        include: {
            model: Blog,
            as: 'readings',
            through: {
                attributes: ['read', 'id'],
                where
            }
        }
    })

    if (!req.user) {
        res.status(404).json({error: 'User not found'})
    }
    next()
}

router.get('/', async (req, res) => {
    const where = {}

    if (req.query.read) {
        where.read = req.query.read
    }

    const users = await User.findAll({
        include: [
            {
                model: Blog,
                attributes: ['title', 'url', 'likes']
            },
            {
                model: Blog,
                as: 'readings',
                through: {
                    attributes: ['read'],
                    where: {
                        read: {
                            [Op.is]: true
                        }
                    }
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

router.put('/:id', findUserWithID, async (req, res) => {
    req.user.username = req.body.username
    await req.user.save()
    res.json(req.user)
})

router.get('/:id', findUserWithID, async (req, res) => {

    res.json(req.user)
})


module.exports = router