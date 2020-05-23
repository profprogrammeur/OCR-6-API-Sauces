const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { check, validationResult } = require('express-validator');
const User = require('../models/User');


exports.signup = (req, res, next) => {
    // if(req.body.password.length>10){
  
    // [
    //     // username must be an email
    //     check('username').isEmail(),
    //     // password must be at least 5 chars long
    //     check('password').isLength({ min: 5 })
    // ], (req, res) => {
    //     // Finds the validation errors in this request and wraps them in an object with handy functions
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(422).json({ errors: errors.array() });
    //     } 

    // if (req.body.password.length > 7) {

         bcrypt.hash(req.body.password, 10)
        
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur bien créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        //500 = erreur server
        .catch(error => res.status(500).json({ error }));
    // } else (res.status(500).json({ 'mot de passe trop court' }));
    // } else { res.status(500).json({ message : 'mot de passe trop court' })}
    }
   

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id },
                            'B0B800188DE5D16DD1B154990AA87078EE3A0F81B1721386C48CC7A069C2DB26',
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};