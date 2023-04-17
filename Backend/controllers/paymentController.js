const catchAsyncError = require("../middleWares/catchAsyncErrors")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)