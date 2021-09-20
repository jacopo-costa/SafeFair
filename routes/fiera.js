const express = require("express");
const db = require("../db");
const router = express.Router();
const User = require("../models/user");
const Pren = require("../models/prenotazioni");

const { ensureAuthenticated } = require("../config/auth");

router.get("/all", (req, res) => {
  db.all("SELECT * FROM Fiere", [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("fiere", { fiere: rows });
  });
});

router.get("/:id", (req, res) => {
  db.get("SELECT * FROM Fiere WHERE id = " + req.params.id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("fiera", { fiera: row });
  });
});

router.get("/", (req, res) => {
  var q = req.query.q;
  var string =
    "SELECT * FROM Fiere WHERE (nome LIKE '%" +
    q +
    "%' OR posizione LIKE '%" +
    q +
    "%' OR tag LIKE '%" +
    q +
    "%')";
  db.all(string, (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("search", { q, fiere: rows });
  });
});

router.get("/prenota/:id", ensureAuthenticated, async (req, res) => {
  // Ottiene l'utente
  var user = await User.findById(req.user.id);

  // Se un seller ottiene le esposizioni prenotate
  // se non ce ne sono per la fiera la aggiunge
  if (user.tipo === "SELLER") {
    var esposizioni = await Pren.getExp(req.user.id, req.params.id);
    if (esposizioni == undefined) {
      await Pren.saveExp(req.user.id, req.params.id);
      req.flash("success_msg", "Esposizione prenotata con successo");
      res.redirect("/dashboard");
    } else {
      req.flash("error_msg", "Esposizione già prenotata");
      res.redirect("/dashboard");
    }
  } else {
    // Ottiene le prenotazioni per utente e fiera
    var prenotazioni = await Pren.getPren(req.user.id, req.params.id);
    if (prenotazioni == undefined) {
      // Genera un ID prenotazione casuale
      var idPrenotazione = Math.floor(Math.random() * 100000000);
      await Pren.savePren(req.user.id, req.params.id, idPrenotazione);
      await Pren.decrement(req.params.id);
      req.flash("success_msg", "Prenotazione effettuata con successo");
      res.redirect("/dashboard");
    } else {
      req.flash("error_msg", "Prenotazione già presente");
      res.redirect("/dashboard");
    }
  }
});

module.exports = router;
