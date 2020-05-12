const mongoose = require('mongoose');

// const thingSchema = mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     imageUrl: { type: String, required: true },
//     userId: { type: String, required: true },
//     price: { type: Number, required: true },
// });

const thingSchema = mongoose.Schema({
    // _id: { type: String, required: true },
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
    // disliked: { type: Boolean, required: true },

});
// export class Sauce {
//     _id: string;
//     name: string;
//     manufacturer: string;
//     description: string;
//     heat: number;
//     likes: number;
//     dislikes: number;
//     imageUrl: string;
//     mainPepper: string;
//     usersLiked: string[];
//     usersDisliked: string[];
//     userId: string;
// }

module.exports = mongoose.model('Thing', thingSchema);