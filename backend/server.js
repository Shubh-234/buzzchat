const express = require('express');
const dotenv = require("dotenv");
const app = express();
const authRoutes = require('./routes/auth.routes');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT;

//mongo db connection 
mongoose.connect(process.env.MONGO_URI, {
  })
    .then(() => {
      console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
  


app.get("/",(req,res)=> {
    res.send("hello world");
})


//middlewares
app.use("/api/auth",authRoutes);


//server
app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
})