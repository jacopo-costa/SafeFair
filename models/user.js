const db = require("../db.js");
const bcrypt = require("bcrypt");

// Check if user exist by its email
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

// Save the User on the DB
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

// Check email & password of the user and return it
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
        };
        let check = false;

        if (bcrypt.compareSync(password, row.password)) check = true;

        resolve({ user, check });
      }
    });
  });
};

// Search an user by its ID
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
        };
        resolve(user);
      }
    });
  });
};
