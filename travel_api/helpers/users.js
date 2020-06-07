const db = require('../models');

exports.getUsers = (req, res) => {
    db.User.find().then((user) => {
        res.json(user)
    }).catch((e) => {
        console.log(e);
    })
};

exports.createUser = (req, res) => {
    console.log(req.body);
    db.User.create(req.body).then((newUser) => {
        res.json(newUser);
    }).catch((err) => {
        res.send(err)
    })   
};

exports.showUser = (req, res) => {
    db.User.findById(req.params.userId).then((foundUser) => {
        res.json(foundUser);
    }).catch((err) => {
        res.send(err)
    })
};

exports.updateUser = (req, res) => {
    db.User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true})
    .then((user) => {
        res.json(user)
    }).catch((err) => {
        res.send(err)
    })
};

exports.deleteUser = (req, res) => {
    db.User.remove({_id: req.params.userId})
    .then(() => {
        res.json({message: 'We deleted it!'})
    }).catch((err) => {
        res.send(err)
    })
};

module.exports = exports;