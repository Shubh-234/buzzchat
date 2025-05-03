const { default: mongoose } = require('mongoose');
const mongooose = require('mongoose');

const userSchema = new mongooose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName : {
        type: String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    gender : {
        type: String,
        required: true,
        enum : ["male","female"]
    },
    profilePic : {
        type : String,
        default : ""
    }
})

const User = mongoose.model("User",userSchema);

module.exports = {User};