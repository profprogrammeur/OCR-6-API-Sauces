const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

// const Thing = require('./models/thing');

// const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);


mongoose.connect('mongodb+srv://antra:QT0SS39NHsIh1RRh@antcluster-zvn53.gcp.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

///////////////
// app.use('/api/auth/signup', (req, res, next) => {
// app.use('/api/auth/login', (req,res,next)=>{
//     const stuff = [
//         {
//             message: "IjZAgcfl7p92ldGxad68LJZdL17lhWy",
//         }
//     ];
//     res.status(200).json(stuff);
//     next();
// });
///////////////////
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname,'images')));

// app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);


module.exports = app;