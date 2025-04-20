const express = require('express');
const jwt = require('jsonwebtoken');
const Blog = require("../models/bloglist.js")
const User = require('../models/user.js');
const appConfig = require('../utils/config.js')


const bloglistRouter = express.Router();

bloglistRouter.get('/', (request, response, next) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs);
    }).catch((error) => {
        next(error)
    })
});

bloglistRouter.post('/', async (request, response, next) => {
    console.log(request, response);
    
    const { title, author, url, likes } = request.body;

    const decodedToken = jwt.verify(request.token, appConfig.SECRET);

    if(!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    try {
        const targettedUser = await User.findById(decodedToken.id);
        const blog = new Blog({
            title, 
            author, 
            url, 
            likes,
            user: targettedUser.id
        });

        const savedBlog = await blog.save();
        targettedUser.blogs = [...targettedUser.blogs, savedBlog._id];
        await targettedUser.save();

        response.status(201).json(savedBlog)

    } catch (error) {
        next(error)
    }
})

bloglistRouter.delete('/', async (request, response, next) => {
    try {
         await Blog.deleteMany({});
         response.status(201).json({
            message: "all blogs deleted successfully"
         })
    } catch (error) {
        next(error)
    }
})





module.exports = bloglistRouter