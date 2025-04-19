const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const userRouter = require('express').Router();
const appConfig = require('../utils/config.js')

userRouter.get('/', async (request, response, next) => {
    try {
        const allUser = await User.find({}).populate('blogs', { title: 1, author: 1, likes: 1 });
        return response.json(allUser);
    } catch (error) {
        next(error)
    }
})

userRouter.post('/', async (request, response, next) => {
    const { username, name, email, password } = request.body;
    //do a couple of validation on the fields
    if(username && username.trim().length < 8){
        return response.status(400).json({
            error: "username must be more 7 character length"
        })
    }
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        return response.status(400).json({
            error: "Wrong email format, please check again"
        })
    }

    try {
        const saltRound = 7;
        const passwordHash = await bcrypt.hash(password, saltRound);

        const user = new User({
            username,
            name,
            email,
            passwordHash
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})

module.exports = userRouter