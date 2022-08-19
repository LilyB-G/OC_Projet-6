const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipe')

const signupRoutes = require('./routes/signup');


mongoose.connect('mongodb+srv://leila:vK77URTBr6M318Mg@project6.sbm3pe6.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connection MongoDB ok'))
    .catch(() => console.log('MongoDB connection failed'));

mongoose.connection.on('error', err => {
    console.log(err);
});

app.use(express.json());

app.use((req, res, next) => {
    res.status(201);
    console.log('request received');
    next();
});

// headers Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

// routes
//app.use('/api/recipe/', recipeRoutes);
app.use('/', signupRoutes);





module.exports = app;