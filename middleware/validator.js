
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
        body('email').isEmail(),
        body('password')
        .isLength({ min: 3 })
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/,)
        // .isInt({min : 2}),
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
    validate,
    // passwordValidator
}
