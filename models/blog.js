const {Model, INTEGER, TEXT} = require("sequelize");
const {sequelize} = require('../util/db')
class Blog extends Model {
}

Blog.init({
    id: {
        type: INTEGER, primaryKey: true, autoIncrement: true
    }, author: {
        type: TEXT
    }, url: {
        type: TEXT, notNull: true
    }, title: {
        type: TEXT, notNull: true
    }, likes: {
        type: INTEGER, defaultValue: 0
    }
}, {
    sequelize, updatedAt: false, createdAt: false, modelName: "blog"
});


module.exports = Blog