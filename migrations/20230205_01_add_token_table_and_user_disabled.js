const {STRING, BOOLEAN} = require("sequelize");

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.createTable('tokens', {
            token: {
                type: STRING,
                notNull: true,
                primaryKey: true
            }
        })

        await queryInterface.addColumn('users', 'disabled', {
            type: BOOLEAN,
            defaultValue: false,
            notNull: true
        })
    },
    down: async ({context: queryInterface}) => {
        await queryInterface.dropTable('tokens')
        await queryInterface.removeColumn('users', 'disabled')
    }
}

