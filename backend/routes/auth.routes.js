const express = require("express");
const router = express.Router();

router.get("/login",(req,res) => {
    res.send("this is the login route");
})

router.get("/signup",(req,res) => {
   res.send("this is the signup route");
})

router.get("/logout",(req,res) => {
    res.send("this is the logout route");
})

module.exports = router;