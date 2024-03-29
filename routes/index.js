const express = require("express");
const db = require("../db");
const router = express.Router();

// HomePage
router.get("/", (req, res) => {
  db.all("SELECT * FROM Fiere ORDER BY id limit 4", [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    db.all("SELECT * FROM News ORDER BY id DESC limit 5", [], (err, righe) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("index", { fiere: rows, news: righe });
    });
  });
});

module.exports = router;
