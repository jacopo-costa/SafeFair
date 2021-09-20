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
exports.getExp = (idUtente) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM esposizioni WHERE idUtente = ?";
      db.all(sql, [idUtente], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  };
