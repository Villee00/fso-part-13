const {INTEGER,  BOOLEAN} = require("sequelize");

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.createTable('reading_lists', {
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
            }
        })
    },
    down: async ({context: queryInterface}) => {
        await queryInterface.dropTable('reading_lists')
    }
}

