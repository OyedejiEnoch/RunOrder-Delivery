const mongoose = require("mongoose");

const nationalKitchenSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please enter your name"],
    },
    price: {
        type: Number,
        required: [true, "Please enter the amount"],
        default: 0.0
    },
    attendant:{
        type:String,
        required: [true, "Please enter customer's name"],
    }
})


module.exports = new mongoose.model("NationalKitchen", nationalKitchenSchema )