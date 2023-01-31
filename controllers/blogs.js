const router = require('express').Router()

const {Blog} = require('../models')
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll()
        req.send(blogs)
    } catch (e) {
        await res.sendStatus(404)
    }
})

router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch (e) {
        await res.status(404).json({e})
    }
})

router.get('/:id').get(async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
            res.send(blog.toJSON())
        } else {
            await res.sendStatus(404)
        }
    } catch (e) {
        res.code(400)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
            await blog.destroy()
            res.status(200).end()
        } else {
            res.status(404).end()
        }
    } catch (e) {
        res.status(404).json({e})
    }
})


module.exports = router