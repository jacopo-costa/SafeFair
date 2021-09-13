// imports
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const sqlite = require('sqlite');
const { query } = require('express')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Connessione al DB
let db = new sqlite.Database('safefair.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Connesso al DB SafeFair');
  })

// porta
const port = 3000

// Ascolta sulla porta 3000
app.listen(port, () => console.info(`Ascolto su porta ${port}`))

// GETs
app.get('/', (req,res) => {
	console.log(req.query)
  	db.all("SELECT * FROM Fiere ORDER BY id limit 5", [], (err, rows) => {
    	if (err) {
    	  return console.error(err.message)
   		}
		db.all("SELECT news FROM News ORDER BY timestamp DESC", [], (err, righe) => {
			if (err) {
				return console.error(err.message)
			}
			res.render("index", {fiere: rows, news: righe})
	})
  })
})

app.get('/:id', (req, res) => {
	db.get("SELECT * FROM Fiere WHERE id = " + req.params.id, (err, row) => {
		if (err) {
			return console.error(err.message)
		  }
		  res.render("fiera", { fiera: row })
	})
})

app.get('/search', (req, res) => {

	console.log(req.query.q)

	// var string = "SELECT * FROM Fiere WHERE (nome LIKE '%" + search + "%' OR posizione LIKE '%" + search + "%' OR tag LIKE '%" + search + "%')"

	// db.query(q, (err, rows) => {

	// 	if (err) {
	// 		return console.error(err.message)
	// 	}
	// 	res.render("search", {fiere: rows, q})

	// })
})