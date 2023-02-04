const {INTEGER, TEXT, STRING} = require("sequelize");

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.createTable('blogs', {
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
        })
        await queryInterface.createTable('users', {
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
            }
        })
        await queryInterface.addColumn('blogs', 'user_id', {
            type: INTEGER,
            allowNull: false,
            references: {model: 'users', key: 'id'},
        })
    },
    down: async ({context: queryInterface}) => {
        await queryInterface.dropTable('blogs')
        await queryInterface.dropTable('users')
    }
}

