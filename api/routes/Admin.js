const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const { createAdminUser, Login } = require('../controllers/adminUsers');


router.post('/create-admin-user', createAdminUser)

router.post('/login', [
    body('uname').isAlphanumeric(),
    body('password').isLength({ max: 16 })
], Login)

module.exports = router