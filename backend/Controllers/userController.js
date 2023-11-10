const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')

//@desc  Register new user
//@route POST //api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exist
    try {
        const userExist = await User.findOne({email})

        if(userExist) {
            res.status(400)
            throw new Error('User already exists')
        }
        const user = await User.create({
            name,
            email,
            password
        })
        res.status(201).json(user)
    } catch (error) {
        throw new Error(error)
    }

    // Hash Password
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
})

//@desc  Get user data
//@route POST //api/users/me
//@access private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// Generate a token
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

const generateToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  };

//@desc  Authenticate a user
//@route GET //api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // comparing plaintext password
    const user = await User.findOne({email})
    if (user && await user.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(user?._id)
        const refreshUser = await User.findByIdAndUpdate(
        user?._id,
        {
            refreshToken: refreshToken,
        }, { new: true });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 1000,
        })
        return res.status(200).json({
            _id: user?._id,
            name: user?.name,
            email: user?.email,
            token: generateToken(user?._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies');
    
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
  
    if (!user) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(403); // 403 for forbidden
    }
  
    await User.findByIdAndUpdate(user._id, { refreshToken: '' }); // Update the user's refresh token
  
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
    });
  
    res.sendStatus(204);
  });

module.exports = {
    registerUser,
    loginUser,
    logout,
    getMe,
}