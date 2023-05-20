const express = require("express");
const app = express();
const session = require('express-session');

const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cloudinary = require("cloudinary")
const fileupload = require("express-fileupload");
const cors = require('cors')
const errorMiddleWares = require("./middleWares/errors")

// set up the CORS policy
const corsOptions = {
  origin: 'https://runorder.store',
  credentials: true,
};



app.use(
  session({
    secret: 'oyedejienoch',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: true,
      httpOnly: true,
      maxAge: 86400000, // Session expiration time (in milliseconds)
    }, // Set secure: true if using HTTPS
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000 }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(fileupload());

app.use(cors(corsOptions)); // this line enables CORS with options for all routes





//import all routes
const products = require("./routes/product")
const drinks = require("./routes/drinks")
const toppings = require("./routes/toppings")
const authUsers = require("./routes/authUser")
const order = require("./routes/order")
const agentsForm = require("./routes/agentForm")
const nationalKitchen = require("./routes/nationalKitchen")
const mannerPalace = require("./routes/mannerPalace")
const doublePortion = require("./routes/doublePortion")
const numbers = require("./routes/numbers")
const mimies = require("./routes/mimies")
const divineHands = require("./routes/divineHands")
const healthchecker = require("./routes/healthchecker")



app.get('/', (req, res) => {
  res.status(200).json({
    success: true,

  })
})

app.use("/api/v1", products)
app.use("/api/v1", drinks)
app.use("/api/v1", toppings)

app.use("/api/v1", authUsers)
app.use("/api/v1", order)
app.use("/api/v1", agentsForm)
app.use("/api/v1", nationalKitchen)
app.use("/api/v1", mannerPalace)
app.use("/api/v1", doublePortion)
app.use("/api/v1", numbers)
app.use("/api/v1", mimies)
app.use("/api/v1", divineHands)
app.use('/healthcheck', healthchecker)

//middleWare to handle errors
app.use(errorMiddleWares)


module.exports = app


