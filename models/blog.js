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
    },
    year: {
        type: INTEGER,
        validate: {
            max: {
                args: [new Date().getFullYear()],
                msg: "Year must be smaller than the current year"
            },
            min: {
                args: [1991],
                msg: "Year must be over 1991"
            }
        },
        notNull: true
    }
}, {
    sequelize, timestamps: true, modelName: "blogs", underscored: true
});


module.exports = Blog