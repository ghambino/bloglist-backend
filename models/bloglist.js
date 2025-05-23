const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        minLength: 6,
        required: true
    },
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;