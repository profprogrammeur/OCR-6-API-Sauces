const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validator');
// const validator = require('../middleware/validator');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

module.exports = router;