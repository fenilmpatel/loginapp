const User = require('../models/user');
const middlewareObj = {};
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please log In to step forward <_>");
    res.redirect("/login");
};

module.exports = middlewareObj;

// const flash = require('connect-flash');
// const passport = require('passport');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const jwt = require('jsonwebtoken');
// const opts = {}
// const checkAuth=
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
// opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
// User.findOne({id: jwt_payload.sub}, (req,res,function(err, newUser) {
//     if (err) {
//         // return done(err, false);
//         req.flash("error_msg","You need to login to Do That!!")
//     }
//     if (newUser) {
//         return done(null, newUser);
//     } else {
//         // return done(null, false);
//         req.flash("error_msg","You need to login to Do That!!")

//         // or you could create a new account
//     }
// }))
// }))

// const checkAuth=(req,res,next)=>{

// // const token = req.headers.authorization.split(" ")[1];
// // console.log(token);

// try{
//     const decoded = jwt.verify(token,'secret');
//     req.userData=decoded;
//     next();
// }catch(error){
//         req.flash("error_msg","authorization failed","You need need to Log in first");

// }
// }

module.exports=middlewareObj;