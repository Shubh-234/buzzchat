const {User} = require('../models/users')

const signup = async (req,res) => {
    
    try {
        const {fullName,userName,password,confirmPassword,gender} = req.body;
        if(confirmPassword !== password){
            res.status(400).json({error: "Passwords do not match"});
        }
        const user = await User.findOne(userName);
        if(userName){
            res.status(400).json({error : `User already exists: ${userName}`});
        }

        const boyUrl = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlUrl = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password,
            gender,
            profilePic : gender === "male" ? boyUrl : girlUrl
        });

        await newUser.save();

        res.status(201).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            userName : newUser.userName,
            gender : newUser.gender,
            profilePic : newUser.profilePic
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal server error"});
    }
}

const login = async (req,res) => {
    try {
        res.send("loggin in")
    } catch (error) {
        console.log("error encountered")
    }
}

const logout = async (req,res) => {
    try {
        res.send("logout");
    } catch (error) {
        console.log("error encountered")
    }
}

module.exports = {login,signup,logout};