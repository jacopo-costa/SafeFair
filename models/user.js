const db = require('../db.js');
const bcrypt = require('bcrypt');


// Cerca un utente per la email
exports.getUser = function (email, password) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM utenti WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: 'Utente non trovato' });
            else {
                const user =
                {
                    nome: row.nome,
                    email: row.email,
                    tag: row.tag,
                    posizione: row.posizione
                }
                let check = false;

                if (bcrypt.compareSync(password, row.password))
                    check = true;

                resolve({ user, check });
            }
        });
    });
};

exports.checkExist = function (email) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM utenti WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: 'Utente non trovato' });
            else {
                const user =
                {
                    nome: row.nome,
                    email: row.email,
                    tag: row.tag,
                    posizione: row.posizione
                }
                let check = false;

                if (bcrypt.compareSync(password, row.password))
                    check = true;

                resolve({ user, check });
            }
        });
    });
};