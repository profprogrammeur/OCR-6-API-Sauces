const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    name: { type: String, minlength: 2, maxlength: 50, required: true },
    manufacturer: { type: String, minlength: 2, maxlength: 50,required: true },
    description: { type: String, minlength: 2, maxlength:300,required: true },
    heat: { type: Number, min: 1, max : 10 ,required: true },
    likes: { type: Number, min: 0 ,required: false },
    dislikes: { type: Number, min: 0, required: false },
    imageUrl: { type: String, minlength: 2, maxlength: 200,required: true },
    mainPepper: { type: String, minlength: 2, maxlength: 50,required: true },
    usersLiked: { type: Array, required: false },
    usersDisliked: { type: Array, required: false },
    userId: { type: String, minlength: 10, maxlength: 50,required: true },
});

module.exports = mongoose.model('Sauce', sauceSchema);