const express = require('express')
const isAuthenticated = require('../middlewares/auth')
const {register, login, logout, getProfile} = require('../controllers/user')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout',isAuthenticated, logout)
router.get('/getProfile', isAuthenticated, getProfile)

module.exports = router