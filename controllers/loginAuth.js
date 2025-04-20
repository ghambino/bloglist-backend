const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('./bloglist.js');
const loginRouter = require('express').Router();
const appConfig = require('../utils/config.js');

loginRouter.post('/', async (request, response, next) => {
    const { username, password } = request.body;

    try {
        const currentUser = await User.findOne({ username});
        const userPassword = currentUser === null ? false : await bcrypt.compare(password, currentUser.passwordHash);

        if(!(currentUser && userPassword)) {
            return response.status(401).json({
                error: 'invalid username or password'
            })
        }

        const userDetailForToken = {
            username,
            email: currentUser.email,
            id: currentUser._id
        }

        const token = jwt.sign(userDetailForToken, appConfig.SECRET);
        response.status(200).send({
            message: "user logged in successfully",
            data: {
                name: currentUser.name,
                username: currentUser.username,
                token
            }
        })
    } catch (error) {
        next(error);
    }
});

module.exports = loginRouter;