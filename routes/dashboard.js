const express = require("express");
const qrcode = require("qrcode");
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
    var near = await Fiere.getFiereByPos(user.posizione);

    res.render("dash-guest", {
      utente: user,
      prenotazioni: pren,
      subscribed: sub,
      fiere: all,
      nearme: near,
    });
  } else {
    var exp = await Pren.getAllExp(req.user.id);
    var sub = await Fiere.getFiereByTags(tags);
    var all = await Fiere.getAllFiere();
    var near = await Fiere.getFiereByPos(user.posizione);

    res.render("dash-seller", {
      utente: user,
      esposizioni: exp,
      subscribed: sub,
      fiere: all,
      nearme: near,
    });
  }
});

// Opzioni per il QR code
var opts = {
  errorCorrectionLevel: "H",
  type: "image/png",
  quality: 1,
  margin: 1,
};

// Mostra il QR code per l'idPrenotazione
router.post("/showQR", ensureAuthenticated, (req, res) => {
  var idPrenotazione = req.body.pren;

  qrcode.toDataURL(idPrenotazione, opts, (err, src) => {
    if (err) {
      req.flash("error_msg", err);
      res.redirect("/dashboard");
    }
    res.render("showQR", {
      qr_code: src,
    });
  });
});

module.exports = router;
