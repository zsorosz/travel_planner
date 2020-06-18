const express = require('express');
const router = express.Router();
const db = require('../models');
const helpers = require('../helpers/users');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require("../models/user");

router.use(cors());

process.env.SECRET_KEY = 'secret';

//////////////////////////
// AUTH ROUTES
/////////////////////////

//Signup route

router.post('/register', (req, res) => {
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    User.findOne({
        email: req.body.email
      })
        .then(user => {
          if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              userData.password = hash
              User.create(userData)
                .then(user => {
                  res.json(user)
                })
                .catch(err => {
                  res.send('error: ' + err)
                })
            })
          } else {
            res.json({ error: 'User already exists' })
          }
        })
        .catch(err => {
          res.send('error: ' + err)
        })
});

//Login route

router.post('/login', (req, res) => {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            // Passwords match
            const payload = {
              _id: user._id,
              username: user.username,
              email: user.email,
              plans: user.plans
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.send(token)
          } else {
            // Passwords don't match
            res.json({ error: 'User does not exist' })
          }
        } else {
          res.json({ error: 'User does not exist' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

  //Show User
  
  router.get('/profil', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  
    User.findOne({
      _id: decoded._id
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

////////////////////////////////////////////////////
//USER ROUTES
///////////////////////////////////////////////////


router.route('/')
    .get(helpers.getUsers)
    // .post(helpers.createUser#);

router.route('/:userId')
    .get(helpers.showUser)
    .put(helpers.updateUser)
    .delete(helpers.deleteUser);

module.exports = router;