const db = require("../db.js");

// Ottiene le prenotazioni per utente e fiera
exports.getFiereByTags = (tags) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM fiere WHERE tag IN (" + tags + ")";
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};


// Ottiene le esposizioni per utente
exports.getExp = (id_utente) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM esposizioni WHERE id_utente = ?";
      db.all(sql, [id_utente], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  };
