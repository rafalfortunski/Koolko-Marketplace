
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/user');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email' }, (email, password, done) => {
            // Match User
            User.findOne({ email: email })
            .then(user => {
                if(!user) {
                    return done(null, false, { message: 'Konto z tym adresem email nie istnieje.' });
                }

                //Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw (err);

                    if(isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Hasło nie jest poprawne.'});
                    }
                });
            })
            .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });   
}