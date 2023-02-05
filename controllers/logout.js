const {verifyToken} = require("../util/middleware");
const router = require('express').Router()

router.delete('/', verifyToken, async (req, res, ) => {
    await req.token.destroy()
    res.status(200).json({message: 'Logout successful'})
})

module.exports = router