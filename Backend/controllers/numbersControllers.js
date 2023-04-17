const Numbers = require("../models/numbers")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");


// to get an agent fromfill for a taking an order
exports.newCafeteriaForm = catchAsyncErrors( async(req, res, next)=>{

    const numbers = await Numbers.create(req.body)

    res.status(201).json({
        success: true,
        numbers
    })
})


// to display all cafeteria form

exports.allCafeteriaForm = catchAsyncErrors(async(req, res, next)=>{
    const resPerPage = 12;
    const formsCount = await Numbers.countDocuments();

    const apiFeatures = new APIFeatures(Numbers.find(), req.query)
        .filter()
        .pagination(resPerPage)

    const cafeteriaForms = await apiFeatures.query;
    
    let numberstotalAmount = 0;
    cafeteriaForms.forEach(form => {
        numberstotalAmount += form.price
    })

        res.status(200).json({
            success: true,
            formsCount,
            numberstotalAmount,
            resPerPage,
            cafeteriaForms
        })
  
});

// to delete all cafeteria form
exports.deleteCafeteriaForm = catchAsyncErrors(async (req, res, next) => {

    const numbers = await Numbers.findById(req.params.id);

    if (!numbers) {
        return next(new ErrorHandler('No Cafeteria from', 404));
    }

    await numbers.remove();

    res.status(200).json({
        success: true,
        message: 'Form is deleted.'
    })

})