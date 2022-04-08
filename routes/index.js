const express = require('express')
const router = express.Router()

//routes
const home = require('./modules/home')
const users = require('./modules/users')
const records = require('./modules/records')
const auth = require('./modules/auth')

//middleware
const { authenticator } = require('../middleware/auth')

//use
router.use('/records', authenticator, records);
router.use('/users', users)
router.use('/auth', auth) // 掛載模組
router.use('/', authenticator, home)

module.exports = router
