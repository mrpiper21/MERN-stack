const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, logout } = require('../Controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logout)
router.get('/me', protect, getMe)

module.exports = router