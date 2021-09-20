const express = require("express");
const db = require("../db");
const router = express.Router();

const User = require("../models/user");
const Pren = require("../models/prenotazioni");
const Fiere = require("../models/fiere");
const { ensureAuthenticated } = require("../config/auth");

// Dashboard
router.get("/", ensureAuthenticated, async (req, res) => {
  var user = await User.findById(req.user.id);

  var array = user.tags.split(",");
  var tags = array.map((x) => "'" + x + "'").toString();

  if (user.tipo === "GUEST") {
    var pren = await Pren.getAllPren(req.user.id);
    var sub = await Fiere.getFiereByTags(tags);
    var all = await Fiere.getAllFiere();

    res.render("dash-guest", {
      utente: user,
      prenotazioni: pren,
      subscribed: sub,
      fiere: all,
    });
  } else {
    var exp = await Pren.getAllExp(req.user.id);
    var fair = await Fiere.getFiereByTags(tags);

    res.render("dash-seller", { utente: user, esposizioni: exp, fairs: fair });
  }
});

router.post("/showQr:id", ensureAuthenticated, async (req, res) => {
  
  
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
