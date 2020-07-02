const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models/user');
const Plans = require('../models/plans');

//Show all Plans

router.get("/", function(req, res){
    User.findById(req.params.id).populate("plans").exec(function(err, user){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.json(user.plans)
            // Plans.find({}, function(err, allPlans){
            //     if(err){
            //         console.log(err);
            //     } else{
            //         res.json(allPlans);
            //     }
            // });
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

// Delete Plan
router.delete("/:planId", (req, res) => {
    Plans.findByIdAndRemove(req.params.planId, function(err){
        if(err){
            res.send(err);
        } else {
            res.json({message: 'We deleted it!'});
        }
    });
});

// Update costs

router.put("/:planId/costs", (req, res) => {
    // const updatedPlan = {
    //     route: {
    //         travelCosts: req.body.travelCosts
    //     }
    // }
    Plans.findByIdAndUpdate(req.params.planId, {$set: {'route.travelCosts': req.body.travelCosts, 'route.accomodationCosts': req.body.accomodationCosts, 'route.otherCosts': req.body.otherCosts}}, {new: true})
    .then((plan) => {
        res.json(plan)
    }).catch((err) => {
        res.send(err)
    })
  });


module.exports = router;