const express = require('express');
const app= express();
const path = require('path');
const expressHandlebars = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser=require("body-parser");
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const expressValidator = require('express-validator');
const  expressSanitizer      = require("express-sanitizer");
// new JwtStrategy(options, verify)
const User = require('./models/user');
//all routes
const indexRoutes = require('./routes/users.js');


// mongoose.connect('mongodb://'+ process.env.MONGO_ATLAS_PW +':rent-ride-api@cluster0-shard-00-00-jdona.mongodb.net:27017,cluster0-shard-00-01-jdona.mongodb.net:27017,cluster0-shard-00-02-jdona.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true');
mongoose.connect('mongodb://rent-ride-api:rent-ride-api@cluster0-shard-00-00-jdona.mongodb.net:27017,cluster0-shard-00-01-jdona.mongodb.net:27017,cluster0-shard-00-02-jdona.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true').then(() => console.log('MongoDB Connected.')).catch(err => console.log(err));
// mongoose.connect('mongodb://localhost:27017/rent-ride-api').then(() => console.log('MongoDB Connected.')).catch(err => console.log(err));;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');
app.get('/',(req,res)=>{
    res.render('index.handlebars')
})


app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(require("express-session")({
    secret: "are we in simulation???",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.');
        var root = namespace.shift();
        var formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use('/',indexRoutes);
app.listen(process.env.PORT || 4000, process.env.IP, function(){
    console.log("Server Started!!! ");
});

 
 module.exports= app;