const db = require("../db.js");

// Ottiene le prenotazioni per utente e fiera
exports.getPren = (idUtente, idFiera) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM prenotazioni WHERE idUtente = ? AND idFiera = ?";
    db.get(sql, [idUtente, idFiera], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Ottiene le esposizioni per utente e fiera
exports.getExp = (idVenditore, idFiera) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM esposizioni WHERE idVenditore = ? AND idFiera = ?";
    db.get(sql, [idVenditore, idFiera], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Ottiene tutte le esposizioni per utente
exports.getAllExp = (idVenditore) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM esposizioni WHERE idVenditore = ?";
    db.all(sql, [idVenditore], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Ottiene tutte le prenotazioni per utente
exports.getAllPren = (idUtente) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM prenotazioni WHERE idUtente = ?";
    db.all(sql, [idUtente], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Salva una prenotazione
exports.savePren = (idUtente, idFiera, idPrenotazione) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO prenotazioni (idUtente, idFiera, idPrenotazione) VALUES (?,?,?)";
    db.run(sql, [idUtente, idFiera, idPrenotazione], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Salva una prenotazione alle esposizioni
exports.saveExp = (idVenditore, idFiera) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO esposizioni (idVenditore, idFiera) VALUES (?,?)";
    db.run(sql, [idVenditore, idFiera], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Elimina una prenotazione alle esposizioni
exports.deleteExp = (idVenditore, idFiera) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM esposizioni WHERE idVenditore = ? AND idFiera = ?";
    db.run(sql, [idVenditore, idFiera], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Elimina una prenotazione
exports.deletePren = (idUtente, idFiera) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM prenotazioni WHERE idUtente = ? AND idFiera = ?";
    db.run(sql, [idUtente, idFiera], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Diminuisce i posti disponibili alla fiera
exports.decrement = (idFiera) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE fiere SET postiRimanenti = postiRimanenti - 1 WHERE id = ?";
    db.run(sql, [idFiera], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Aumenta i posti disponibili alla fiera
exports.increment = (idFiera) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE fiere SET postiRimanenti = postiRimanenti + 1 WHERE id = ?";
    db.run(sql, [idFiera], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
