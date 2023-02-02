const router = require('express').Router()

const {Blog} = require('../models')

blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    if (!req.blog) {
        res.status(404).end()
    }
    else {
        next()
    }
}
router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.send(blogs)
})

router.post('/', async (req, res) => {
    const blog = await Blog.create(req.body)
    return res.json(blog)
})

router.get('/:id', blogFinder, async (req, res) => {
    res.send(req.blog.toJSON())
})

router.delete('/:id', blogFinder, async (req, res) => {
    await req.blog.destroy()
    res.status(200).end()
})

router.put('/:id', blogFinder, async (req, res) => {
    req.blog.likes++;
    await req.blog.save()
    res.json(req.blog)
})

module.exports = router