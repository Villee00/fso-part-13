const {ReadingLists} = require("../models");
const {verifyToken} = require("../util/middleware");
const router = require('express').Router()

const findReadingList = async (req, res, next) =>{
    req.readingList = await ReadingLists.findByPk(req.params.id)
    if(!req.readingList)
        return res.status(404).end()
    next()
}
router.get('/', async (req, res) => {
    const readingLists = await ReadingLists.findAll({
        attributes: ['user_id', 'blog_id'],
    })
    res.json(readingLists)
})

router.put('/:id', verifyToken, findReadingList, async (req, res) => {
    if(req.user.id !== req.readingList.user_id){
        return res.status(400).json({error: "User is not authenticated to do changes on this readinglist"}).end()
    }
    req.readingList.read = req.body.read
    await req.readingList.save()
    res.json(req.readingList)
})

module.exports = router