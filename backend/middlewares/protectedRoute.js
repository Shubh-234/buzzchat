const jwt = require('jsonwebtoken');
const {User} = require('../models/users')
const dotenv = require("dotenv");
const path = require('path')

dotenv.config({path: path.resolve(__dirname,'../../.env')});

const proectedRoute = async (req,res,next) => {
    try {
        const token = req.cookie.jwt;
        
        if(!token){
            res.status(401).json({error: "Unauthorized - no token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            res.status(401).json({error: "Forbidden, token invalid"})
        }
        
        const userId = decoded.userId;

        const user = await User.findById(userId).select("-password");
        if(!user){
            res.status(400).json({error : "User not found"})
        }

        req.user = user;
        next();
        
    } catch (error) {
       console.log(error);
       return res.status(500).json({message: "Internal Server error"}); 
    }
}

module.exports = proectedRoute