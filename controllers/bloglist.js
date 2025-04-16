const express = require('express');
const Blog = require("../models/bloglist.js")

const bloglistRouter = express.Router();

bloglistRouter.get('/', (request, response, next) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs);
    }).catch((error) => {
        next(error)
    })
});

bloglistRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
      response.status(201).json(result)
    }).catch((error) => {
        next(error)
    })
})





module.exports = bloglistRouter