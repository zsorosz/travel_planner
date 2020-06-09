const express = require('express');
const router = express.Router();
const db = require('../models');
const helpers = require('../helpers/users');
const passport = require("passport");
const LocalStrategy   = require("passport-local");
const User = require("../models/user");

// PASSPORT CONFIG
router.use(require("express-session")({
    secret: "Unstoppable Ninja Cseppke!",
    resave: false,
    saveUninitialized: false
  }));
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
  
router.use(function(req, res, next){
    res.locals.currentUser = req.user;
    // res.locals.error = req.flash("error");
    // res.locals.success = req.flash("success");
    next();
});

router.post('/', function(req, res){
    let newUser = new User({username: req.body.username, email: req.body.email});
    db.User.register(newUser, req.body.password, function(err, user){
        if(err){
            //req.flash("error", err.message);
            console.log(err);
        }
        passport.authenticate("local")(req, res, function(){
            //req.flash("success", "Welcome to TeamsApp " + user.username);
            res.send('Success');
        });
    });
});

router.route('/')
    .get(helpers.getUsers)
    // .post(helpers.createUser);

router.route('/:userId')
    .get(helpers.showUser)
    .put(helpers.updateUser)
    .delete(helpers.deleteUser);

module.exports = router;