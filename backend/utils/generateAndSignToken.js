const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const path = require('path')

dotenv.config({path: path.resolve(__dirname, '../../.env')})

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn : '15d'
    });

    // console.log(token);

    res.cookie("jwt", token, {
        maxAge : 15 * 24 * 60 * 60 * 1000,
        sameSite : "strict", //prevents csrf attacks
        httpOnly : true, //prevents xss attacks
        secure : process.env.NODE_ENV !== "development"
    })
    return;
};

module.exports = {generateTokenAndSetCookie}

