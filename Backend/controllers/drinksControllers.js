const Drinks = require("../models/drinks");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary")

exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    let images = []
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = []
    for (var i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products"

        })
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    //if it is a single image then it is a string else it is an array with multiple images 
    req.body.images = imagesLinks
    req.body.user = req.user.id
    const drinks = await Drinks.create(req.body)

    res.status(201).json({
        success: true,
        drinks
    })
});


//get all products  => /api/v1/products/?keyword=
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 8;
    const drinksCount = await Drinks.countDocuments();

    const apiFeatures = new APIFeatures(Drinks.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const drinks = await apiFeatures.query;
    

    setTimeout(() => {
        res.status(200).json({
            success: true,
            drinksCount,
            resPerPage,
            drinks
        })
    }, 2000);


});



//get all products (admin)  => /api/v1/admin/products/
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const drinks = await Drinks.find()


    res.status(200).json({
        success: true,
        drinks
    })
});


//to get a single product details from /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const drinks = await Drinks.findById(req.params.id);

    if (!drinks) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json(drinks)
});


//to update a product => /api/b1/admin/product/:id

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let drinks = await Drinks.findById(req.params.id);

    if (!drinks) {
        return next(new ErrorHandler("Product not found", 404));
    }


    let images = []
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    if (images !== undefined) {
        // Deleting images associated with the product
        for (let i = 0; i < drinks.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(drinks.images[i].public_id)
        }
        let imagesLinks = []
        for (var i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products"

            })
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        //if it is a single image then it is a string else it is an array with multiple images 
        req.body.images = imagesLinks
    }
    drinks = await Drinks.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        drinks
    })
});


// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const drinks = await Drinks.findById(req.params.id);

    if (!drinks) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Deleting images associated with the product
    for (let i = 0; i < drinks.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(drinks.images[i].public_id)
    }

    await drinks.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })

})