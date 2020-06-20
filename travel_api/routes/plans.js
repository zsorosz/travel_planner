const express = require('express');
const router = express.Router({mergeParams: true});
const db = require('../models');
const User = require('../models/user');
const Plans = require('../models/plans');

//Show all Plans

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

//Create new plan

router.post("/new", function(req, res){
    User.findById(req.params.id).populate("plans").exec(function(err, user){
        if(err){
            res.redirect("back");
        } else{
            const newPlan = {
                title: req.body.title,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                route: {
                    departureCity: req.body.departureCity,
                    arrivalCity: req.body.arrivalCity,
                    departureDate: req.body.departureDate,
                    arrivalDate: req.body.arrivalDate,
                    travelMethod: req.body.travelMethod
                }
            }
            Plans.create(newPlan, function(err, plan){
                if(err){
                    console.log(err);
                } else {   
                    // user.save();
                    plan.save();
                };
                user.plans.push(plan);
                user.save();
                res.json(plan);
            });
        }
    });
});

//Show Plan
  
router.get('/:planId', (req, res) => {
    Plans.findById(req.params.planId)
    .then((foundPlan) => {
        res.json(foundPlan);
    }).catch((err) => {
        res.send(err)
    })
})

// Update plan

router.put("/:planId", (req, res) => {
    const updatedPlan = {
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        route: {
            departureCity: req.body.departureCity,
            arrivalCity: req.body.arrivalCity,
            departureDate: req.body.departureDate,
            arrivalDate: req.body.arrivalDate,
            travelMethod: req.body.travelMethod
        }
    }
    Plans.findByIdAndUpdate(req.params.planId, updatedPlan, {new: true})
    .then((plan) => {
        res.json(plan)
    }).catch((err) => {
        res.send(err)
    })
  });

// router.get('/', function(req, res){
//     db.User.findById(req.params.userId).then((foundUser) => {
//         res.json(foundUser);
//     }).catch((err) => {
//         res.send(err)
//     })
// })

module.exports = router;