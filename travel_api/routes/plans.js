const express = require('express');
const router = express.Router();
const db = require('../models');
const User = require('../models/user');
const helpers = require('../helpers/users');


router.get('/:id', function(req, res){
    db.User.findById(req.params.userId).then((foundUser) => {
        res.json(foundUser);
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = router;