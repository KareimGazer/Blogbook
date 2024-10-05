const { PORT, MONGODB_URI } = require('./utils/config')

const express = require('express')
const app = express()

const cors = require('cors')
const statusRouter = require('./controllers/status')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('Mongo DB: Connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
    .then(() => {
        logger.info('Mongo DB: Connected Successfully')
    })
    .catch(({message}) => {
        logger.error('Mongo DB: Connection Error', message)
    })

app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())
// app.use(middleware.requestLogger)

app.use('/info', statusRouter)
// app.use('/api/blogs', blogsRouter)

// app.use(middleware.unknownEndPoint)
// app.use(middleware.castErrorHandler)
// app.use(middleware.validationErrorHandler)

module.exports = app
