const MannerPalace = require("../models/mannerPalace")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");


// to get an agent fromfill for a taking an order
exports.newCafeteriaForm = catchAsyncErrors( async(req, res, next)=>{

    const mannerPalace = await MannerPalace.create(req.body)

    res.status(201).json({
        success: true,
        mannerPalace
    })
})


// to display all cafeteria form

exports.allCafeteriaForm = catchAsyncErrors(async(req, res, next)=>{
    const resPerPage = 12;
    const formsCount = await MannerPalace.countDocuments();

    const apiFeatures = new APIFeatures(MannerPalace.find(), req.query)
        .filter()
        .pagination(resPerPage)

    const cafeteriaForms = await apiFeatures.query;
    
    const manner = await MannerPalace.find()

    let totalAmount = 0;
    manner.forEach(form => {
        totalAmount += form.price
    })

        res.status(200).json({
            success: true,
            formsCount,
            totalAmount,
            resPerPage,
            cafeteriaForms
        })
  
});

// to delete all cafeteria form
exports.deleteCafeteriaForm = catchAsyncErrors(async (req, res, next) => {

    const mannerPalace = await MannerPalace.findById(req.params.id);

    if (!mannerPalace) {
        return next(new ErrorHandler('No Cafeteria from', 404));
    }

    await mannerPalace.remove();

    res.status(200).json({
        success: true,
        message: 'Form is deleted.'
    })

})