// IMPORT EXPRESS //
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

mongoose
  .connect(
    'mongodb+srv://AdelDrissi:Boubou91480@cluster0.ndmyy.mongodb.net/Adel?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Transform req on JSON //
app.use(express.json());

// Import routers //
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauces');

const allowCrossDomain = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
};
app.use(allowCrossDomain);

app.use('/api/auth', userRoutes);
app.use('/api/sauce', sauceRoutes);

module.exports = app;
