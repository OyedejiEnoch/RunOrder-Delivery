const Mimies = require("../models/mimies")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");


// to get an agent fromfill for a taking an order
exports.newCafeteriaForm = catchAsyncErrors( async(req, res, next)=>{

    const mimies = await Mimies.create(req.body)

    res.status(201).json({
        success: true,
        mimies
    })
})


// to display all cafeteria form

exports.allCafeteriaForm = catchAsyncErrors(async(req, res, next)=>{
    const resPerPage = 12;
    const formsCount = await Mimies.countDocuments();

    const apiFeatures = new APIFeatures(Mimies.find(), req.query)
        .filter()
        .pagination(resPerPage)

    const cafeteriaForms = await apiFeatures.query;
    
    let mimiestotalAmount = 0;
    cafeteriaForms.forEach(form => {
        mimiestotalAmount += form.price
    })

        res.status(200).json({
            success: true,
            formsCount,
            mimiestotalAmount,
            resPerPage,
            cafeteriaForms
        })
  
});

// to delete all cafeteria form
exports.deleteCafeteriaForm = catchAsyncErrors(async (req, res, next) => {

    const mimies = await Mimies.findById(req.params.id);

    if (!mimies) {
        return next(new ErrorHandler('No Cafeteria from', 404));
    }

    await mimies.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Form is deleted.'
    })

})