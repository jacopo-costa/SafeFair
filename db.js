const sqlite3 = require("sqlite3");

// Connessione al DB
const db = new sqlite3.Database("safefair.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connesso al DB SafeFair");
});

module.exports = db;
