const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../db");

// Load User schema
const User = require("../models/user");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        // Match user & password
        User.getUser(email, password)
          .then(({ user, check }) => {
            if (!check) {
              return done(null, false, { message: "Password errata" });
            }
            return done(null, user);
          })
          .catch((errormsg) => {
            return done(null, false, { message: errormsg });
          });

        passport.serializeUser((user, done) => {
          done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
          User.findById(id, (err, user) => {
            done(err, user);
          });
        });
      }
    )
  );
};
