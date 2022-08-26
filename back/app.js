const express = require('express'); //Importation du apckage Express
const app = express(); //Appel de la méthode Express
const cors = require('cors');
const path = require('path'); //Importation de 'path' pour définir les chemins
const mongoose = require('mongoose'); //Importation du package Mongoose (sert à définir les types de variables et à structurer les données)
const recipeRoute = require('./routes/recipe'); //importation du router "recipe"
const userRoute = require('./routes/user'); //importation du router "user"
const morgan = require('morgan') //middleware qui enregistre les requests


morgan.token('body',(req => JSON.stringify (req.body)));

app.use(morgan(':url :method :body '));

app.use(express.json());

  //Connexion à la base de données avec password et id
mongoose.connect('mongodb+srv://teddybear:dGG9W47VcfjDEPv@project6.sbm3pe6.mongodb.net/?retryWrites=true&w=majority',
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

app.use('/', cors());
app.options('*', cors());

// Gestion des routes
app.use('/api/sauces', recipeRoute);
app.use('/api/auth', userRoute ); 

//dossier images
app.use('/images', express.static(path.join(__dirname, '/images')));

//exportation de la constante app
module.exports = app;