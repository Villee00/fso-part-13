const express = require('express')
require('express-async-errors')
const app = express()
const { PORT } = require('./util/config')
const { connectDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const readingListRouter = require('./controllers/reading_list')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readingListRouter)

const start = async () => {
    await connectDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()