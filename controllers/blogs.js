const router = require('express').Router()

const {Blog, User} = require('../models')
const {verifyToken} = require("../util/db");
const {Op} = require("sequelize");

blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    if (!req.blog) {
        res.status(404).end()
    } else {
        next()
    }
}
router.get('/', async (req, res) => {
    let where = {}
    if (req.query.search) {
        where = {
            [Op.or]: [
                {author: {[Op.iLike]: `%${req.query.search}%`}},
                {title: {[Op.iLike]: `%${req.query.search}%`}}
            ]
        }

    }

    const blogs = await Blog.findAll({
        attributes: {
            exclude: ['userId']
        },
        include: {
            model: User,
            attributes: ['name']
        },
        order:[['likes', 'DESC']],
        where
    })
    res.send(blogs)
})

router.post('/', verifyToken, async (req, res) => {
    const blog = Blog.build(req.body)
    blog.userId = req.user.id
    await blog.save()
    return res.json(blog)
})

router.get('/:id', blogFinder, async (req, res) => {
    res.send(req.blog.toJSON())
})

router.delete('/:id', verifyToken, blogFinder, async (req, res) => {
    if (req.blog.userId === req.user.id) {
        await req.blog.destroy()
        res.status(200).end()
    } else {
        return res.status(401).send({
            error: "User can't delete that blog"
        })
    }
})

router.put('/:id', blogFinder, async (req, res) => {
    req.blog.likes++;
    await req.blog.save()
    res.json(req.blog)
})

module.exports = router