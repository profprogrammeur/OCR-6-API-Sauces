const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validator');
// const validator = require('../middleware/validator');
const userCtrl = require('../controllers/user');
const checkPwd = require('../middleware/checkPwd');

const { userValidationRules, validate } = require('../middleware/validator.js')

router.post('/signup',checkPwd, userValidationRules(), validate, userCtrl.signup);

router.post('/login', userCtrl.login);

module.exports = router;