const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;


    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        console.log(err);

        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }



    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err }

        error.message = err.message;

        // Wrong Mongoose Object ID Error
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        //handling mongoose validation errors
        if (err.name === "validationError") {
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message, 400)
        }


        // handling wrong jwt error

        //handling mongoose duplicate key error
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message, 400)
        }


        // handling wrong jwt error
        if (err.name === "JsonwebTokenError") {
            const message = "Json web token is invalid. Try again"
            error = new ErrorHandler(message, 400)
        }


        // handling expired jwt error
        if (err.name === "TokenExpiredError") {
            const message = "Json web token is expired. Try again"
            error = new ErrorHandler(message, 400)
        }


        res.status(err.statusCode).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }


}