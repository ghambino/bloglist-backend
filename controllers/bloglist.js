const express = require('express');
const Blog = require("../models/bloglist.js")
const User = require('../models/user.js');

const bloglistRouter = express.Router();

bloglistRouter.get('/', (request, response, next) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs);
    }).catch((error) => {
        next(error)
    })
});

bloglistRouter.post('/', async (request, response, next) => {
    const { title, author, url, likes, userId } = request.body;

    try {
        const targettedUser = await User.findById(userId);
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