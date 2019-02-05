const express = require('express');
const router = express.Router();
const app = express;
const passport = require('passport');
const flash = require('connect-flash')
const User = require('../models/user');
const checkAuth = require('../middleware/checkAuth')
router.get('/', function (req, res) {

    res.render('index.handlebars');
},

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            //req.flash('error_msg', 'You are not logged in.')
            res.redirect('/login');
        }
    })
router.get("/index", function (req, res) {
    res.render("index");
                            });

router.get("/register", function (req, res) {
    res.render("register");
});

router.post("/register", function (req, res) {
    var newUser = new User(
        {
            name: req.body.name,
            // gender: req.body.gender,
            email: req.body.email,
            username: req.body.username,
            terms: req.body.terms
        }
    );
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error_msg", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success_msg", "Welcome to login app, " + user.username + " :) ");
            res.redirect("/login");
            console.log(newUser);

        });
    });
});

// LOGIN ROUTE
router.get("/login", function (req, res) {
    res.render("login");
});

// app.post("/login", middleware, callback);
router.post("/login", passport.authenticate("local",

    {
        successRedirect: "/index",
        failureRedirect: "/login",

    }))



// LOGOUT ROUTE
router.get("/logout", (req, res) => {

    req.logOut();
    req.flash("success_msg", "Successfully Logged you out!!!");
    res.redirect("/login");
});


router.get('/poll', checkAuth.isLoggedIn, function (req, res) {

    res.render('poll');
});
router.post('/post', (req, res) => {
        
        req.flash("success_msg", "your response saved successfully!!"),
        res.redirect("/");
});
module.exports = router;
