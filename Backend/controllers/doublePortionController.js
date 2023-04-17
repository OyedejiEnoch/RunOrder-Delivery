const DoublePortion = require("../models/doublePortion")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");


// to get an agent fromfill for a taking an order
exports.newCafeteriaForm = catchAsyncErrors( async(req, res, next)=>{

    const doublePortion = await DoublePortion.create(req.body)

    res.status(201).json({
        success: true,
        doublePortion
    })
})


// to display all cafeteria form

exports.allCafeteriaForm = catchAsyncErrors(async(req, res, next)=>{
    const resPerPage = 12;
    const formsCount = await DoublePortion.countDocuments();

    const apiFeatures = new APIFeatures(DoublePortion.find(), req.query)
        .filter()
        .pagination(resPerPage)

    const cafeteriaForms = await apiFeatures.query;
    
    let dptotalAmount = 0;
    cafeteriaForms.forEach(form => {
        dptotalAmount += form.price
    })

        res.status(200).json({
            success: true,
            formsCount,
            dptotalAmount,
            resPerPage,
            cafeteriaForms
        })
  
});

// to delete all cafeteria form
exports.deleteCafeteriaForm = catchAsyncErrors(async (req, res, next) => {

    const doublePortion = await DoublePortion.findById(req.params.id);

    if (!doublePortion) {
        return next(new ErrorHandler('No Cafeteria from', 404));
    }

    await doublePortion.remove();

    res.status(200).json({
        success: true,
        message: 'Form is deleted.'
    })

})