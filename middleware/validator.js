// const { check, validationResult } = require('express-validator');

// module.exports = (req, res, next) => {
//     try {
//         console.log(req.body.email)
//     // [
//     //     // username must be an email
//     //     check(req.body.email).isEmail(),
//     //     // password must be at least 5 chars long
//     //     check(req.body.password).isLength({ min: 5 })
//     // ], (req, res) => {
//     //     // Finds the validation errors in this request and wraps them in an object with handy functions
//     //     const errors = validationResult(req);
//     //     if (!errors.isEmpty()) {
//     //         return res.status(422).json({ errors: errors.array() });
//     //     }} 

//     } catch {
//         res.status(401).json({
//             error: new Error('Invalid request!')
//         });
//     }
// };

const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
    return [
        // username must be an email
        body('email').isEmail(),
        // password must be at least 5 chars long

        // body('password').isLength({ min: 12 })
        
        // body('password').matches(),
        // password must be at least 5 chars long
        // body('sauce'),
        // body('image'),



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
}
