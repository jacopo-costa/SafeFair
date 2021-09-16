const express = require("express");
const db = require("../db");
const router = express.Router();

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

module.exports = router;
