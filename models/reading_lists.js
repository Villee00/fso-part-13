const {Model, INTEGER, BOOLEAN} = require("sequelize");
const {sequelize} = require('../util/db')

class Reading_lists extends Model {
}

Reading_lists.init({
    id: {
        type: INTEGER,
        notNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    read: {
        type: BOOLEAN,
        notNull: true,
        defaultValue: false
    },
    blog_id: {
        type: INTEGER,
        notNull: true,
        references: {model: 'blogs', key: 'id'}
    },
    user_id: {
        type: INTEGER,
        notNull: true,
        references: {model: 'users', key: 'id'}
    },
}, {
    sequelize, timestamps: false, modelName: "readingLists", underscored: true
});


module.exports = Reading_lists