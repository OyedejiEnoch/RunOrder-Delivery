const User = require("../models/users");

const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleWares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { send } = require("process");
const cloudinary = require("cloudinary")


//Register a user => /api/v1/register


exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: 'avatars',
    //     width: 150,
    //     crop: "scale",
       
    // })

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
       
        
    })
     // Set session variables
    req.session.authenticated = true;
    req.session.lastActivity = Date.now();

    sendToken(user, 200, res)

    // avatar: {
    //     public_id: result.public_id,
    //     url: result.secure_url
    // }
})

// To Login users  => /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    //check if email and password is not entered by user
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email & password", 400))
    }

    // fining the user details in the database
    const user = await User.findOne({ email }).select("+password")

    // if user email doesnt exist
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }


    // check if password is correct or not using the users.js
    const isPasswordMatched = await user.comparePassword(password);

    //if password is not matched form users.js
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    req.session.authenticated = true;
    req.session.lastActivity = Date.now();
    //else
    // const token = user.getJwtToken();

    // res.status(200).json({
    //     success: true,   
    //     token
    // })
    sendToken(user, 200, res)
})


//forgot password  to send message for forgot password /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    //firstly checking if the email provided is in the database
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found with this email", 404))
    }

    // if it exist get reset token, and the user password token is in the users
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    //create reset password url 
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email,
    please do ignore it`

    try {

        await sendEmail({
            email: user.email,
            subject: "Run Order password recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
})



//Reset password  to send message for forgot password /api/v1/password/reset:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash the url token then compare with the database to see if it is correct
    //firstly to hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    // to compare
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
        // making sure the resetPasswordExpire is greater than now
    });

    if (!user) {
        return next(new ErrorHandler("Password reset token is invalid or expired", 400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400))
    }

    //setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)
})


//Getting currently logged in user profile  => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
});

//Update / change password => /api/v1/password/update 
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    //check previous user password

    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler("Old password is incorrect"), 400)
    }

    user.password = req.body.password
    await user.save()

    sendToken(user, 200, res)
});



//Update user profile => /api/v1/me/update

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email

    }
    //update avatar: Still todo


    // if (req.body.avatar !== "") {
    //     const user = await User.findById(req.user.id)

    //     const image_id = user.avatar.public_id;
    //     const res = await cloudinary.v2.uploader.destroy(image_id);

    //     const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //         folder: 'avatars',
    //         width: 150,
    //         crop: "scale"
    //     });

    //     newUserData.avatar = {
    //         public_id: result.public_id,
    //         url: result.secure_url
    //     }
    // }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    })


})



// to logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    // to check the cookie and set to null
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    req.session.destroy((err) => {
        if (err) {
          console.log(err);
        }
        res.redirect('/login');
      });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
});


//Admin Routes

//Get all users => /api/v1/admin/users

exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
});

//Get user details => /api/v1/admin/user/:id

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`), 500)
    }

    res.status(200).json({
        success: true,
        user
    })
});

// update user profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role

    }


    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    })


});

//Delete user => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`), 500)
    }
    // //Remove avatar from Todo
    // const image_id = user.avatar.public_id;
    // await cloudinary.v2.uploader.destroy(image_id);

    await user.remove();

    res.status(200).json({
        success: true,

    })
});
