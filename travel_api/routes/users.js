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
});

router.get('/:userId', (req, res) => {
    db.User.findById(req.params.userId).then((foundUser) => {
        res.json(foundUser);
    }).catch((err) => {
        res.send(err)
    })
});

router.put('/:userId', (req, res) => {
    db.User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true})
    .then((user) => {
        res.json(user)
    }).catch((err) => {
        res.send(err)
    })
});

router.delete('/:userId', (req, res) => {
    db.User.remove({_id: req.params.userId})
    .then(() => {
        res.json({message: 'We deleted it!'})
    })
})

module.exports = router;