const morgan = require("morgan");
morgan.token('body', (req, res) => JSON.stringify(req.body));
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const unknownEndPoint = (req, res) => {
    res.statusMessage = "Path Not found"
    res.status(404)
}

const castErrorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        res.statusMessage = "Malformatted ID"
        return response.status(400).send({ error:  error.message})
    } 

    next(error)
}

const validationErrorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'ValidationError') {
        res.statusMessage = "Invalid Data"
        return response.status(400).send({ error: error.message })
    } 

    next(error)
}

module.exports = {
    requestLogger,
    castErrorHandler,
    validationErrorHandler,
    unknownEndPoint
}
