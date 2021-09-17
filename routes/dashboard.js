const express = require("express");
const db = require("../db");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Dashboard
router.get("/", ensureAuthenticated, (req, res) => {
  db.get("SELECT * FROM Utenti WHERE id = " + req.user.id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    var array = row.tag.split(",");
    var tags = array.map((x) => "'" + x + "'").toString();
    if (row.tipo === "GUEST") {
      db.all(
        "SELECT * FROM Prenotazioni WHERE id_utente = " + row.id,
        (err, rows) => {
          if (err) {
            return console.error(err.message);
          }

          db.all(
            "SELECT * FROM Fiere WHERE tag IN (" + tags + ")",
            (err, righe) => {
              if (err) {
                return console.error(err.message);
              }
              console.log(righe);
              res.render("dash-guest", {
                user: row,
                prenotazioni: rows,
                fiere: righe,
              });
            }
          );
        }
      );
    } else {
      db.all(
        "SELECT * FROM Esposizioni WHERE id_utente = " + row.id,
        (err, rows) => {
          if (err) {
            return console.error(err.message);
          }

          db.all(
            "SELECT * FROM Fiere WHERE tag IN (" + tags + ")",
            (err, righe) => {
              if (err) {
                return console.error(err.message);
              }

              res.render("dash-guest", {
                user: row,
                esposizioni: rows,
                fiere: righe,
              });
            }
          );
        }
      );
    }
  });
});

module.exports = router;
