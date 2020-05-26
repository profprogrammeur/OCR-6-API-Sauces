
// var passwordValidator = require('password-validator');
// var schema = new passwordValidator();
// schema
//     .is().min(8)                                    // Minimum length 8
//     .is().max(100)                                  // Maximum length 100
//     .has().uppercase()                              // Must have uppercase letters
//     .has().lowercase()                              // Must have lowercase letters
//     .has().digits()     


const { body, validationResult } = require('express-validator')
// var aa = body('sauce')
// JSON.parse(aa);
// console.log(aa)
const userValidationRules = () => {
    // console.log(aa);
    return [
        // username must be an email
        // body('email')
        //     .isEmail()
        //     .normalizeEmail(),

        // body('password')
        //     .isLength({ min: 12 }).withMessage('Password must contain at least 12 characters in length.')
        //     .matches('[0-9]').withMessage('Password must contain at least 1 number.')
        //     .matches('[a-z]').withMessage('Password must contain at least 1 lowercase letter.')
        //     .matches('[A-Z]').withMessage('Password must contain at least 1 uppercase letter.'),
            // .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/,)
            // .isInt({min : 2}),
// true
        // body('sauce').isJSON()
    ]
}

const validate = (req, res, next) => {
    // console.log(req)
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
