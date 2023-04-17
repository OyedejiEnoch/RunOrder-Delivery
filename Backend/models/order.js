const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({

    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        // city: {
        //     type: String,
        //     required: true
        // },
        //change to cafiteria
        phoneNo: {
            type: String,
            required: true
        },
        // postalCode: {
        //     type: String,
        //     required: true
        // },
        cafeteria: {
            type: String,
            required: true
        }
        // to delete or remove both postalcode and country
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
        }
    ],

    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    paidAt: {
        type: Date
    },

    itemPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    //pack price
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    //delivery price
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model("Order", orderSchema)