const express = require('express'); //Importation du apckage Express
const app = express(); //Appel de la méthode Express
//const cors = require('cors');
const path = require('path'); //Importation de 'path' pour définir les chemins
const mongoose = require('mongoose'); //Importation du package Mongoose (sert à définir les types de variables et à structurer les données)
const recipeRoute = require('./routes/recipe'); //importation du router "recipe"
const userRoute = require('./routes/user'); //importation du router "user"
const morgan = require('morgan'); //middleware qui enregistre les requests
require('dotenv').config()


morgan.token('body', (req => JSON.stringify(req.body)));

app.use(morgan(':url :method :body '));

app.use(express.urlencoded({ extended: true }));//add this before any route or before using req.body

app.use(express.json());

//Connexion à la base de données avec password et id
const password = process.env.DB_PASSWORD;
const login = process.env.DB_USERNAME;

mongoose.connect('mongodb+srv://' + login + ':' + password + '@project6.sbm3pe6.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    .then(() => console.log('Connection MongoDB ok'))
    .catch(() => console.log('MongoDB connection failed'));

// headers Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//app.use('/', cors());
//app.options('*', cors());

// Gestion des routes
app.use('/api/sauces', recipeRoute);
app.use('/api/auth', userRoute);

//dossier images
app.use('/images', express.static(path.join(__dirname, '/images')));


//exportation de la constante app
module.exports = app;