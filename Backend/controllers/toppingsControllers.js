const Toppings = require("../models/toppings");
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
    const toppings = await Toppings.create(req.body)

    res.status(201).json({
        success: true,
        toppings
    })
});


//get all products  => /api/v1/products/?keyword=
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 8;
    const toppingsCount = await Toppings.countDocuments();

    const apiFeatures = new APIFeatures(Toppings.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const toppings = await apiFeatures.query;
    

    setTimeout(() => {
        res.status(200).json({
            success: true,
            toppingsCount,
            resPerPage,
            toppings
        })
    }, 2000);


});



//get all products (admin)  => /api/v1/admin/products/
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const toppings = await Toppings.find()


    res.status(200).json({
        success: true,
        toppings
    })
});


//to get a single product details from /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const toppings = await Toppings.findById(req.params.id);

    if (!toppings) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        toppings
    })
});


//to update a product => /api/b1/admin/product/:id

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let toppings = await Toppings.findById(req.params.id);

    if (!toppings) {
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
        for (let i = 0; i < toppings.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(toppings.images[i].public_id)
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
    toppings = await toppings.findByIdAndUpdate(req.params.id, req.body, {
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

    const toppings = await Toppings.findById(req.params.id);

    if (!toppings) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Deleting images associated with the product
    for (let i = 0; i < toppings.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(toppings.images[i].public_id)
    }

    await toppings.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })

})