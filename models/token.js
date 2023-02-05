const {Model, STRING} = require("sequelize");
const {sequelize} = require('../util/db')

class Token extends Model {
}

Token.init({
    token: {
        type: STRING,
        notNull: true,
        primaryKey: true
    }
}, {
    sequelize, timestamps: false, modelName: "tokens"
});

module.exports = Token