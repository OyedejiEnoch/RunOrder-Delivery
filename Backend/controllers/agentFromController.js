const Agent = require("../models/agentsOrder")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");


// to get an agent fromfill for a taking an order
exports.newAgentForm = catchAsyncErrors( async(req, res, next)=>{

    const agent = await Agent.create(req.body)

    res.status(201).json({
        success: true,
        agent
    })
})


// to display all agents that took an order

exports.allAgentForm = catchAsyncErrors(async(req, res, next)=>{
    const resPerPage = 12;
    const agentsCount = await Agent.countDocuments();

    const apiFeatures = new APIFeatures(Agent.find(), req.query)
        .filter()
        .pagination(resPerPage)

    const agents = await apiFeatures.query;
    

        res.status(200).json({
            success: true,
            agentsCount,
            resPerPage,
            agents
        })
  
});

// to delete an agent order form
exports.deleteAgentform = catchAsyncErrors(async (req, res, next) => {

    const agent = await Agent.findById(req.params.id);

    if (!agent) {
        return next(new ErrorHandler('No Agent with Such order from', 404));
    }

    await agent.remove();

    res.status(200).json({
        success: true,
        message: 'Agent Order from is deleted.'
    })

})