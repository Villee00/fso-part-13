const {ReadingLists} = require("../models");
const router = require('express').Router()

router.get('/', async (req, res) => {
    const readingLists = await ReadingLists.findAll({
        attributes: ['user_id', 'blog_id'],
    })
    res.json(readingLists)
})

module.exports = router