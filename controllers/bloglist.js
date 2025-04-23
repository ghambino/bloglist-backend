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
    const { title, author, url, likes } = request.body;
    // const decodedToken = jwt.verify(request.token, appConfig.SECRET);
    const extractedUser = request.user;

    if(!extractedUser) {
        return response.status(401).json({ error: 'token invalid' })
    }

    try {
        const targettedUser = await User.findById(extractedUser.id);
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

bloglistRouter.delete('/:id', async (request, response, next) => {
    // const decodedToken = jwt.verify(request.token, appConfig.SECRET);
    // if(!decodedToken.id) {
    //     return response.status(401).json({ error: 'invalid or expired token' })
    // }mm

    if(!extractedUser) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const blogId = request.params.id;
    try {
         const targettedBlog = await Blog.findById(blogId);
         if(!(targettedBlog && (targettedBlog.user.toString() === extractedUser.id.toString()))){
            return response.status(403).json({ error: "Unauthorised operation"})
         }
         await Blog.findByIdAndDelete(blogId);
         response.status(201).json({
            message: "blog deleted successfully"
         })
    } catch (error) {
        next(error)
    }
});

module.exports = bloglistRouter