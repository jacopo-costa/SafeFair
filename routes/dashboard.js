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
    var fair = await Fiere.getFiereByTags(tags);

    res.render("dash-guest", { utente: user, prenotazioni: pren, fairs: fair });
  } else {
    //var exp = await Fiere.getExp(req.user.id);
    var fair = await Fiere.getFiereByTags(tags);

    res.render("dash-seller", { utente: user, fairs: fair });
  }
});

module.exports = router;
