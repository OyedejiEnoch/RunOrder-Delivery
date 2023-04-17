const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please enter your name"],
    },
    cafeteria:{
        type:String,
        required: [true, "Please enter cafeteria name"],
    },
    customer:{
        type:String,
        required: [true, "Please enter customer's name"],
    },
    price: {
        type: Number,
        required: [true, "Please enter the amount"],
        default: 0.0
    },
})


module.exports = new mongoose.model("AgentsOrder", agentSchema)