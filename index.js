const express = require('express')
const app = express()
const {Model, INTEGER, TEXT, NUMBER, Sequelize} = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL)

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
        type: NUMBER, defaultValue: 0
    }
}, {
    sequelize, updatedAt: false, createdAt: false, modelName: "blog"
});
app.use(express.json())
app.route('/api/blogs').get(async (request, response) => {
    try {
        const blogs = await Blog.findAll()
        response.send(blogs)
    } catch (e) {
        await response.sendStatus(404)
    }
}).post('/api/blogs', async (request, response) => {
    try {
        const blog = await Blog.create(request.body)
        return response.json(blog)
    } catch (e) {
        await response.status(404).json({e})
    }
})
app.route('/api/blogs/:id').get(async (request, response) => {
    try {
        const blog = await Blog.findByPk(request.params.id)
        if (blog) {
            response.send(blog.toJSON())
        } else {
            await response.sendStatus(404)
        }
    } catch (e) {
        response.code(400)
    }
})
    .delete(async (request, response) => {
        try {
            const blog = await Blog.findByPk(request.params.id)
            if (blog) {
                await blog.destroy()
                response.status(200).end()
            } else {
                response.status(404).end()
            }
        } catch (e) {
            response.status(404).json({e})
        }
    })


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server started at port: ${PORT}`)
})