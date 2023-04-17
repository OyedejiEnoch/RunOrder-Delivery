const NkCafeteria = require("../models/nationalKitchen")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");


// to get an agent fromfill for a taking an order
exports.newCafeteriaForm = catchAsyncErrors( async(req, res, next)=>{

    const nationalKitchen = await NkCafeteria.create(req.body)

    res.status(201).json({
        success: true,
        nationalKitchen
    })
})


// to display all cafeteria form

exports.allCafeteriaForm = catchAsyncErrors(async(req, res, next)=>{
    const resPerPage = 12;
    const formsCount = await NkCafeteria.countDocuments();

    const apiFeatures = new APIFeatures(NkCafeteria.find(), req.query)
        .filter()
        .pagination(resPerPage)

    const cafeteriaForms = await apiFeatures.query;
    
    let nktotalAmount = 0;
    cafeteriaForms.forEach(form => {
        nktotalAmount += form.price
    })

        res.status(200).json({
            success: true,
            formsCount,
            nktotalAmount,
            resPerPage,
            cafeteriaForms
        })
  
});

// to delete all cafeteria form
exports.deleteCafeteriaForm = catchAsyncErrors(async (req, res, next) => {

    const nationalKitchen = await NkCafeteria.findById(req.params.id);

    if (!nationalKitchen) {
        return next(new ErrorHandler('No Cafeteria from', 404));
    }

    await nationalKitchen.remove();

    res.status(200).json({
        success: true,
        message: 'Form is deleted.'
    })

})