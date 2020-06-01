// Loads environment variables from .env file into process.env
require('dotenv').config();
const mongoKey = process.env.MONGOKEY

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

//sanitizer
const mongoSanitize = require('express-mongo-sanitize');
// especially for express-mongo-sanitize
app.use(bodyParser.urlencoded({ extended: true }));
// general parser
app.use(bodyParser.json());
// Replace any prohibited characters in keys
app.use(mongoSanitize({
    replaceWith: '_'
}))

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb+srv://antra:'+mongoKey+'@antcluster-zvn53.gcp.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

    //.use process all kind of request     
    //header definitions allow CORS  (Cross Origin Ressource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//response for image requestfrom static directory
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;