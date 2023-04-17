const app = require("./app")
const connectDatabase = require("./config/database")
const cloudinary = require('cloudinary')
const dotenv = require('dotenv').config({ path: "config/.env" });


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



//handle uncaught excetions 
process.on("uncaughtException", err => {
    console.log(`ERROR: ${err.stack}`);
    console.log("Shutting down server due to uncaught exceptions");
    process.exit(1)
})
//example of uncaught exception console.log(a);

//setting up config file



  


//connecting to database
connectDatabase();

app.listen(4000, function () {
    console.log(`Server started on PORT: 3000 `);
})


//to handle unhandled promise rejections.

process.on("unhandleRejection", err => {
    console.log(`ERROR ${err.stack}`);
    console.log("Sutting down the system due to unhandled promise rejection");
    server.close(() => {
        process.exit(1)
    })
})