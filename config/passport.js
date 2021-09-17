const LocalStrategy = require("passport-local").Strategy;

// Load User model
const User = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
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
        return done(null, user.id);
      });

      passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
          return done(null, user);
        });
      });
    })
  );
};
