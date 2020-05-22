const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    imageUrl: { type: String, required: true },
    mainPepper: { type: String, required: true },
    usersLiked: { type: Array, required: false },
    usersDisliked: { type: Array, required: false },
    userId: { type: String, required: true },
});

module.exports = mongoose.model('Sauce', sauceSchema);