//General error handler for backend
const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode);

    res.json({
        message: err.message,
        //If is no longer in development and is in production, stack will not be returned to user
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler
}