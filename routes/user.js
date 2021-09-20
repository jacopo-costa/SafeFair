const express = require("express");
const router = express.Router();
const passport = require("passport");

// Carica i modelli per Utente
const User = require("../models/user");
const userSchema = require("../models/userSchema");

// Controllo se l'utente è loggato
const { forwardAuthenticated, ensureAuthenticated } = require("../config/auth");

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

// Registrazione
router.post("/register", (req, res) => {
  var { nome, email, password, password2, posizione } = req.body;
  let errors = [];

  if (!nome || !email || !password || !password2 || !posizione) {
    errors.push({ msg: "Per favore riempire tutti i campi (tag facoltativo)" });
  }

  if (password != password2) {
    errors.push({ msg: "Le password sono diverse" });
  }

  if (password.length < 6) {
    errors.push({ msg: "La password deve essere di almeno 6 caratteri" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      nome,
      email,
      password,
      password2,
      posizione,
    });
  } else {
    User.checkExist(email)
      .then(function () {
        var form = req.body;
        var tags = Object.keys(form)
          .filter((key) => form[key] === "on" && key !== "tipo")
          .toString();
        var tipo;
        if (form.tipo === "on") {
          tipo = "SELLER";
        } else {
          tipo = "GUEST";
        }

        const schema = new userSchema(
          req.body.nome,
          req.body.email,
          req.body.password,
          req.body.posizione,
          tipo,
          tags
        );
        User.saveUser(schema)
          .then(function () {
            req.flash(
              "success_msg",
              "Sei iscritto, ora puoi effettuare il login"
            );
            res.redirect("login");
          })
          .catch(function (err) {
            console.log(err);
          });
      })

      .catch(function (errormsg) {
        errors.push({ msg: errormsg });
        res.render("register", {
          errors,
          nome,
          email,
          password,
          password2,
          posizione,
        });
      });
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout();
  req.flash("success_msg", "Logout completato");
  res.redirect("/user/login");
});

// Cambia la posizione
router.post("/changePos", (req, res) => {
  User.changePos(req.user.id, req.body.pos)
    .then(function () {
      req.flash("success_msg", "Posizione cambiata!");
      res.redirect("/dashboard");
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Cambia i tag
router.post("/changeTags", (req, res) => {
  var form = req.body;
  var tags = Object.keys(form)
          .filter((key) => form[key] === "on" && key !== "tipo")
          .toString();

  User.changeTags(req.user.id, tags)
    .then(function () {
      req.flash("success_msg", "Tags cambiati!");
      res.redirect("/dashboard");
    })
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = router;
