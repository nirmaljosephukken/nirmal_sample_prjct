const express = require('express');
const app= express();
const bodyParser =require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const is_auth = require('./middlewares/is_auth');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
    next();
});

app.use( blogRoutes);
app.use(authRoutes);

mongoose.connect('mongodb+srv://user:1234@cluster0.7twjo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(result => {
        app.listen(5500); 
    })
    .catch(error => {
        console.log(error);
    });


app.listen(8000);