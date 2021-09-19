const db = require("../db.js");
const bcrypt = require("bcrypt");

// Controlla se l'utente esiste dalla email
exports.checkExist = (email) => {
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

// Salva l'utente nel DB
exports.saveUser = (user) => {
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

// Controlla la email e la password dell'utente e lo ritorna
// con il check
exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM utenti WHERE email = ?";
    db.get(sql, [email], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) reject("Utente non trovato");
      else {
        const user = {
          id: row.id,
          username: row.email,
          tipo: row.tipo,
        };
        let check = false;

        if (bcrypt.compareSync(password, row.password)) check = true;

        resolve({ user, check });
      }
    });
  });
};

// Cerca un utente per il suo ID
exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM utenti WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) reject("Utente non trovato");
      else {
        const user = {
          id: row.id,
          username: row.email,
          tipo: row.tipo,
          tags: row.tag,
          nome: row.nome
        };
        resolve(user);
      }
    });
  });
};
