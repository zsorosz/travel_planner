const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.User.find().then((user) => {
        res.json(user)
    }).catch((e) => {
        console.log(e);
    })
});

router.post('/', (req, res) => {
    console.log(req.body);
    db.User.create(req.body).then((newUser) => {
        res.json(newUser);
    }).catch((err) => {
        res.send(err)
    })   
})

module.exports = router;