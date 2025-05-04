const express = require('express');
const dotenv = require("dotenv");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/messages.routes');
const protectedRoutes = require('./middlewares/protectedRoute')

dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.use(express.json()); //parse the incoming requests to json
app.use(cookieParser());

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
app.use("/api/message",protectedRoutes,messageRoutes)


//server
app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
})