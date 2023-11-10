const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            console.log(JSON.stringify(req.headers))
            token = req.headers.authorization.split(' ')[1]
            console.log('Token:', token)

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            // Get user from the token
            const user = await User.findById(decoded?.id);
            req.user = user
            next() // calling the next piece of middleware
            
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')

        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }