const {Model, STRING, INTEGER, BOOLEAN} = require("sequelize");

const {sequelize} = require('../util/db')

class User extends Model {
}

User.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: STRING,
        notNull: true,
    },
    password: {
        type: STRING,
        notNull: true,
    },
    username: {
        type: STRING,
        notNull: true,
        validate: {
            isEmail: {
                msg: 'Validation isEmail on username failed'
            }
        }
    },
    disabled: {
        type: BOOLEAN,
        defaultValue: false,
        notNull: true
    }

}, {sequelize, modelName: 'users', timestamps: true, underscored: true})


module.exports = User