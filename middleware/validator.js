
// var passwordValidator = require('password-validator');
// var schema = new passwordValidator();
// schema
//     .is().min(8)                                    // Minimum length 8
//     .is().max(100)                                  // Maximum length 100
//     .has().uppercase()                              // Must have uppercase letters
//     .has().lowercase()                              // Must have lowercase letters
//     .has().digits()     


const { body, validationResult } = require('express-validator')

const userValidationRules = () => {
    return [
        // username must be an email
        body('email')
            .isEmail()
            .normalizeEmail(),

       
            
            


        body('password')
            .isLength({ min: 12 }).withMessage('Password must contain at least 12 characters in length.')
            .matches('[0-9]').withMessage('Password must contain at least 1 number.')
            .matches('[a-z]').withMessage('Password must contain at least 1 lowercase letter.')
            .matches('[A-Z]').withMessage('Password must contain at least 1 uppercase letter.')
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
        
    })
}

module.exports = {
    userValidationRules,
    validate
}
