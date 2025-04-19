const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//relative imports
const { MONGODB_URI } = require('./utils/config.js');
const { exceptionHandler, unknownEndpoint } = require('./utils/middleware.js');
const bloglistRouter = require("./controllers/bloglist.js");
const userRouter = require("./controllers/user.js")



const app = express();

//setup database connection
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI).then(() => {
    console.log('connected to MONGODB');
}).catch((err) => {
    console.log('error connecting to MongoDB:', err.message)
})

//use appropriate middleware for intercepting request and response
app.use(express.json());
app.use(cors())

//route-handler middlewares
app.use('/api/users', userRouter);
app.use('/api/blogs', bloglistRouter)


app.use(unknownEndpoint);
app.use(exceptionHandler)

module.exports = app 
