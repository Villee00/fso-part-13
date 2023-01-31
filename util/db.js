const {Sequelize} = require("sequelize");
const { DATABASE_URL } = require('./config')

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

module.exports = {connectDatabase, sequelize}