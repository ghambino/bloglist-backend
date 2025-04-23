const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//relative imports
const { MONGODB_URI } = require('./utils/config.js');
const { exceptionHandler, unknownEndpoint, tokenExtractor,  userExtractor } = require('./utils/middleware.js');
const bloglistRouter = require("./controllers/bloglist.js");
const userRouter = require("./controllers/user.js");
const loginRouter = require('./controllers/loginAuth.js')

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
app.use(tokenExtractor);
// app.use(userExtractor);

//route-handler middlewares`
app.use('/home', (request, response, next) => {
    console.log('hello abbas');
    response.send('welcome to my page and test environment')
});
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', userExtractor, bloglistRouter);

//remaining middleware handlers
app.use(unknownEndpoint);
app.use(exceptionHandler)

module.exports = app 
