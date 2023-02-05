const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_lists')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: ReadingList, as: "readingList"})
Blog.belongsToMany(User, {through: ReadingList, as: "usersReadingList"})

module.exports = {
    Blog,
    User,
    ReadingList
}