const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/users")

// check if users is Aunthenticated or not wheather to login or can continue
exports.isAunthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    // to get the token i.e cookie token 
    const { token } = req.cookies
    // if token doesnt exist
    if (!token) {
        return next(new ErrorHandler("Login first to access this resource", 401))

    }
    // to verify if our token is correct or not /exist
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // and if correct
    req.user = await User.findById(decoded.id);
    next()

})

// Handling users roles

exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        // i.e if the user accessing this roles is not included, then cannot access them
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403))
        }
        next()
    }
}