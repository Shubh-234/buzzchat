const express = require('express');
const dotenv = require("dotenv");
const app = express();
const authRoutes = require('./routes/auth.routes');

dotenv.config();
const PORT = process.env.PORT || 5000


app.get("/",(req,res)=> {
    res.send("hello world");
})


app.use("/api/auth",authRoutes);

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
})