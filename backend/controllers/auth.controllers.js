const {User} = require('../models/users')
const bcrypt = require('bcryptjs');
const {generateTokenAndSetCookie} = require("../utils/generateAndSignToken")

const signup = async (req,res) => {
    
    try {
        const {fullName,userName,password,confirmPassword,gender} = req.body;
        if(confirmPassword !== password){
            return res.status(400).json({error: "Passwords do not match"});
        }
        const user = await User.findOne({userName});
        if(user){
            return res.status(400).json({error : `User already exists: ${userName}`});
        }

        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const boyUrl = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlUrl = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password : hashedPassword,
            gender,
            profilePic : gender === "male" ? boyUrl : girlUrl
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                userName : newUser.userName,
                gender : newUser.gender,
                profilePic : newUser.profilePic
            })
        }else{
            return res.status(400).json({error: "Invalid user credentials"});
        }
    } catch (error) {
        console.log("error in signup controller: " + error);
        return res.status(500).json({error : "Internal server error"});
    }
}

const login = async (req,res) => {
    try {
        const {userName,password} = req.body;
        const user = await User.findOne({userName});
        const hashedPassword = user.password;
        const comparingPasswords = await bcrypt.compare(password,hashedPassword);

        if(!user || !comparingPasswords){
            res.status(400).json({error: "Invalid username or password"});
        }
        generateTokenAndSetCookie(user._id,res);

        return res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            userName : user.userName,
            gender : user.gender,
            profilePic : user.profilePic
        });
    } catch (error) {
        console.log("error in login controller: " + error);
        res.status(500).json({error : "Internal server error"});
    }
}

const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge: 0});
        return res.status(200).json({message : "Logged out successfully"});
    } catch (error) {
        console.log("error in logout controller: " + error);
        res.status(500).json({error : "Internal server error"});
    }
}

module.exports = {login,signup,logout};