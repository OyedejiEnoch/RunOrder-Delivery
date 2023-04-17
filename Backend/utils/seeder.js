const Product = require("../models/products");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database")


const products = require("../data/products")

dotenv.config({ path: "Backend/config/.env" });

connectDatabase();

const seedProduct = async () => {
    try {

        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products)
        console.log('All Products are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProduct();