const {Sequelize} = require("sequelize");
const {DATABASE_URL, SECRET} = require('./config')
const jwt = require('jsonwebtoken')


const sequelize = new Sequelize(DATABASE_URL)

const connectDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connected')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        return process.exit(1)
    }
}

const verifyToken = (req, res, next) => {
    const auth = req.headers["authorization"]
    if (!auth) {
        res.code(400).json({error: "Authorization failed"})
    }
    const token = auth.split(' ')[1]

    try{
        req.user = jwt.verify(token, SECRET)
        next()
    }
    catch (err){
        return res.status(401).json({
            error: 'failed to verify token'
        })
    }
}


module.exports = {connectDatabase, sequelize, verifyToken}