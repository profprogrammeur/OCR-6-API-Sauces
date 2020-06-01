const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, minlength: 2, maxlength: 50, required: true, unique: true },
    password: { type: String, minlength: 12, maxlength:100,required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
