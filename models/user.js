const db = require("../db.js");
const bcrypt = require("bcrypt");

// Controlla che esista un utente dalla sua email
exports.checkExist = function (email) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM utenti WHERE email = ?";
    db.get(sql, [email], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) resolve();
      else {
        reject("Utente già presente");
      }
    });
  });
};

// Salva un utente
exports.saveUser = function (user) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO utenti(nome, email, password, posizione, tipo, tag)  VALUES (?,?,?,?,?,?)";
    user.password = bcrypt.hashSync(user.password, 10);
    db.run(
      sql,
      [
        user.nome,
        user.email,
        user.password,
        user.posizione,
        user.tipo,
        user.tag,
      ],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

// Restituisce un utente attraverso emael password
exports.getUser = function (email, password) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM utenti WHERE email = ?";
    db.get(sql, [email], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) reject("Utente non trovato");
      else {
        const user = {
          id: row.id,
          nome: row.nome,
          posizione: row.posizione,
          tipo: row.tipo,
          tag: row.tag,
        };
        let check = false;

        if (bcrypt.compareSync(password, row.password)) check = true;

        resolve({ user, check });
      }
    });
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM utenti WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) reject("Utente non trovato");
      else {
        const user = {
          id: row.id,
          nome: row.nome,
          posizione: row.posizione,
          tipo: row.tipo,
          tag: row.tag,
        };
        resolve(user);
      }
    });
  });
};
