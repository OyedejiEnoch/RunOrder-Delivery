const DivineHands = require("../models/divineHands")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");


// to get an agent fromfill for a taking an order
exports.newCafeteriaForm = catchAsyncErrors( async(req, res, next)=>{

    const divineHands = await DivineHands.create(req.body)

    res.status(201).json({
        success: true,
        divineHands
    })
})


// to display all cafeteria form

exports.allCafeteriaForm = catchAsyncErrors(async(req, res, next)=>{
    const resPerPage = 12;
    const formsCount = await DivineHands.countDocuments();

    const apiFeatures = new APIFeatures(DivineHands.find(), req.query)
        .filter()
        .pagination(resPerPage)

    const cafeteriaForms = await apiFeatures.query;
    
    const manner = await DivineHands.find()

    let divinetotalAmount = 0;
    manner.forEach(form => {
        divinetotalAmount += form.price
    })

        res.status(200).json({
            success: true,
            formsCount,
            divinetotalAmount,
            resPerPage,
            cafeteriaForms
        })
  
});

// to delete all cafeteria form
exports.deleteCafeteriaForm = catchAsyncErrors(async (req, res, next) => {

    const divineHands = await DivineHands.findById(req.params.id);

    if (!divineHands) {
        return next(new ErrorHandler('No Cafeteria from', 404));
    }

    await divineHands.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Form is deleted.'
    })

})