const express = require('express');
const router = express.Router();
const db = require('../models');
const User = require('../models/user');
const Plans = require('../models/plans');

router.get("/", function(req, res){
    User.findById(req.params.id).populate("plans").exec(function(err, user){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            Plans.find({}, function(err, allPlans){
                if(err){
                    console.log(err);
                } else{
                    res.json(allPlans);
                }
            });
        }
    });
});


router.get('/', function(req, res){
    db.User.findById(req.params.userId).then((foundUser) => {
        res.json(foundUser);
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = router;