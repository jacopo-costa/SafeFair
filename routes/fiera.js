const express = require("express");
const db = require("../db");
const router = express.Router();
const User = require("../models/user");

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

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

router.get("/prenota/:id", ensureAuthenticated, (req, res) => {
  User.findById(req.user.id)
  .then((user) => {
    if(user.tipo === "SELLER"){
      req.flash("error_msg", "Sei un SELLER, non puoi prenotare posti");
      res.redirect("/");
    }
  });

  // db.get(
  //   "SELECT * FROM prenotazioni WHERE id_utente = ?",
  //   [req.user.id],
  //   (err, row) => {
  //     if (err) {
  //       return console.error(err.message);
  //     } else if (row) {
  //       req.flash("error_msg", "Prenotazione già effettuata");
  //       res.redirect("/dashboard");
  //       return;
  //     }
  //   }
  // );

  // // Genera un ID prenotazione casuale
  // var idPrenotazione = Math.floor(Math.random() * 100000000);

  // //Inserisce la prenotazione
  // db.run(
  //   "INSERT INTO prenotazioni (id_utente, id_fiera, id_prenotazione) VALUES (?,?,?)",
  //   [req.user.id, req.params.id, idPrenotazione],
  //   (err) => {
  //     if (err) {
  //       return console.log(err.message);
  //     }
  //   }
  // );
  // // Decrementa i posti disponibili per la fiera
  // db.run(
  //   "UPDATE fiere SET postiRimanenti = postiRimanenti - 1 WHERE id = ?",
  //   [req.params.id],
  //   (err) => {
  //     if (err) {
  //       return console.log(err.message);
  //     }
  //   }
  // );
});

module.exports = router;
