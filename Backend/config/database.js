
const mongoose = require("mongoose")


const connectDatabase = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(con => {
        console.log(`MongoDB database connected`);
    })
}


module.exports = connectDatabase