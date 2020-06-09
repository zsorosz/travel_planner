const express = require('express');
const router = express.Router();
const db = require('../models');
const helpers = require('../helpers/users');
const User = require("../models/user");

router.get('/:username', (req, res) => {
    db.User.findOne({username: req.params.username}).then((foundUser) => {
        res.json(foundUser);
    }).catch((err) => {
        res.send(err)
    })
})