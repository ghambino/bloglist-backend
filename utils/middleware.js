const jwt = require('jsonwebtoken');
const appConfig = require('../utils/config.js');
const  User = require('../models/user.js');
//error categories...schema and database related error, network errors, server error, 
const exceptionHandler = (error, request, response, next) => {
    console.error(error)
    
    if(error.name === "CastError") {
        return response.status(400).send({ error: "malformatted input"})
    } 

    if(error.name === "validationError") {
        return response.status(400).json({
            error: error.message
        })
    } 

    if(error.name === "MongoServerError"){
        if(error.code === 11000){
            return response.status(409).json({
                error: "Duplicate key error"
            })
        }
        return response.status(500).json({
            error: "Database error"
        })
    } 

    if(error.name === "JsonWebTokenError") {
        return response.status(401).json({
            error: "invalid token"
        })
    } 
    
    if(error.name === "TokenExpiredError") {
        return response.status(401).json({
            error: "Token expired"
        })
    } 
    
    if(error.name === "NetworkError") {
        return response.status(502).json({
            error: "Network error occurred"
        })
    } 
    
    if(error.name === "ServerError") {
        return response.status(500).json({
            error: "Internal server error"
        })
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
    const authorization =  request.get('authorization');
    if(authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.replace('Bearer ', '');
        request.token = token
    }else {
        request.token = null;
    }
    next()
}

const userExtractor = async(request, response, next) => {
    const authToken = request.token;
    const decodedToken = jwt.verify(request.token, appConfig.SECRET);

    if(authToken && decodedToken.id){
        const currentUser = await User.findById(decodedToken.id);
        request.user = {
            username: currentUser.username,
            id: currentUser.id
        };
    }else {
        request.user = null;
    }
    next()
}

module.exports = { 
    exceptionHandler, 
    unknownEndpoint, 
    tokenExtractor,
    userExtractor
}