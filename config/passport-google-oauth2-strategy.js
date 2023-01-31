const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// Tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID : "1041048936187-p1beb2q1a73k4kvhplugpsetgd95gnvl.apps.googleusercontent.com",
        clientSecret : "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",
        callbackURL : "http://localhost:8000/users/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // Find the user
        User.findOne({email : profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google strategy-passport', err);
                return;
            }
            console.log(profile);
            if(user){
                // If found , set this user as req.user
                return done(null,user);
            }
            else{
                // If not found, create the user and set it as req.user
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('Error in google strategy-passport', err);
                        return;
                    }
                    return done(null,user);
                });
            }
        });
    }

));

module.exports = passport;