const db = require("../db.js");

// Ottiene le prenotazioni per utente e fiera
exports.getPren = (id_utente, id_fiera) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM prenotazioni WHERE id_utente = ? AND id_fiera = ?";
    db.get(sql, [id_utente, id_fiera], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Ottiene tutte le prenotazioni per utente
exports.getAllPren = (id_utente) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM prenotazioni WHERE id_utente = ?";
    db.all(sql, [id_utente], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Salva una prenotazione
exports.savePren = (id_utente, id_fiera, id_prenotazione) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO prenotazioni (id_utente, id_fiera, id_prenotazione) VALUES (?,?,?)";
    db.run(sql, [id_utente, id_fiera, id_prenotazione], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Elimina una prenotazione
exports.deletePren = (id_utente, id_fiera, id_prenotazione) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM prenotazioni WHERE id_utente = ? AND id_fiera = ?";
    db.run(sql, [id_utente, id_fiera], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Diminuisce i posti disponibili alla fiera
exports.decrement = (id_fiera) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE fiere SET postiRimanenti = postiRimanenti - 1 WHERE id = ?";
    db.run(sql, [id_fiera], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Aumenta i posti disponibili alla fiera
exports.increment = (id_fiera) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE fiere SET postiRimanenti = postiRimanenti + 1 WHERE id = ?";
    db.run(sql, [id_fiera], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
