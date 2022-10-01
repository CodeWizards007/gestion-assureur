const logger = require('../config/Logger');

const errorLogger = (error, request, response, next) => {
   if(error)
    {
        logger.error( `${error.message}`)
        next(error) // calling next middleware
    }

}

// Error handling Middleware function reads the error message
// and sends back a response in JSON format
const errorResponder = (error, request, response, next) => {
    response.header("Content-Type", 'application/json')
    if(error.status===404)
    {
        next(error)
    }else
    {
        const status = error.status || 400
        return response.status(status).send(error.message)
    }

}

// Fallback Middleware function for returning
// 404 error for undefined paths
const invalidPathHandler = (error,request, response, next) => {
    return response.status(404).send(`invalid path: ${request.path}`)
}
module.exports = { invalidPathHandler,errorResponder,errorLogger };
