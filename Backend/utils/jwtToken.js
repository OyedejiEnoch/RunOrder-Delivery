// create and send token and save in the cookie / to ut everything inside a token
const Cookies = require('cookies');


const sendToken = (user, statusCode, res, req) => {
    // the user will be the userschema attached in the authusercontrolllers, also the status code too, but the res is from here

    //create jwt token
    const token = user.getJwtToken();


    // Create cookies instance
    const cookies = new Cookies(req, res);

    //to store jwt token in the cookie, we prepare options
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.protocol === 'https', // Set to true for HTTPS
        sameSite: 'None',
        secure:true

    }

    cookies.set('token', token, options);
    // res.setHeader('Set-Cookie', `token=${token}; SameSite=None; Secure; Domain=runorder.store`);
    // res.setHeader('Set-Cookie', `token=${token}; SameSite=None; Secure`);

    res.status(statusCode).json({
        success: true,
        token,
        user
    })
};

module.exports = sendToken

// domain: 'www.runorder.store', // Replace with your actual domain
// res.setHeader('Set-Cookie', `token=${token}; SameSite=None; Secure`);
// res.setHeader('Access-Control-Allow-Origin', "https://runorder.store");
// res.setHeader('Access-Control-Allow-Credentials', 'true');