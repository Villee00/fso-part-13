const {INTEGER} = require("sequelize");

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.addColumn('blogs', 'year', {
            type: INTEGER,
            validate: {
                type: INTEGER,
                validate: {
                    max:  {
                        args: [new Date().getFullYear()],
                        msg: "Year must be smaller than the current year"
                    },
                    min:  {
                        args: [1991],
                        msg: "Year must be over 1991"
                    }
                },
                notNull: true
            },
            notNull: true
        })
    },
    down: async ({context: queryInterface}) => {
        await queryInterface.removeColumn('blogs', 'year')
    }
}

