// create and send token and save in the cookie / to ut everything inside a token

const sendToken = (user, statusCode, res) => {
    // the user will be the userschema attached in the authusercontrolllers, also the status code too, but the res is from here

    //create jwt token
    const token = user.getJwtToken();

    //to store jwt token in the cookie, we prepare options
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user
    })
};

module.exports = sendToken