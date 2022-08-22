const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const recipeRoute = require('./routes/recipe')
const userRoute = require('./routes/user');
const morgan = require('morgan')


morgan.token('body',(req => JSON.stringify (req.body)));

app.use(morgan(':url :method :body '));

app.use(express.json());


  app.use(function(err, req, res, next) {
    // 'SyntaxError: Unexpected token n in JSON at position 0'
    err.message;
    next(err);
  });

mongoose.connect('mongodb+srv://teddybear:dGG9W47VcfjDEPv@project6.sbm3pe6.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    
    .then(() => console.log('Connection MongoDB ok'))
    .catch(() => console.log('echec connection mongoDB'));

app.use((req, res, next) => {
    res.status(205);
    console.log('request received');
    next();
});


// headers Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use('/', cors());
app.options('*', cors());

// routes

app.use('/api/sauces', recipeRoute);
app.use('/api/auth', userRoute ); 

//dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));




module.exports = app;