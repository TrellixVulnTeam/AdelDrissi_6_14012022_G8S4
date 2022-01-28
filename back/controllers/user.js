const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const userAd = new user({
        email: req.body.email,
        password: hash,
      });
      userAd
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
};
exports.login = (req, res, next) => {
  user
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.KEY, {
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
