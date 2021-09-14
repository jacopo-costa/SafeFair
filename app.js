// imports
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const sqlite3 = require('sqlite3');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(session({
	secret: 'mysecret',
	resave: false,
	saveUninitialized: false
  }))

// Connessione al DB
let db = new sqlite3.Database('safefair.db', (err) => {
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

	var x = req.query.q;
	db.all(`SELECT * FROM Fiere WHERE (nome LIKE '%${x}%' OR descrizione LIKE '%${x}%' OR tag LIKE '%${x}%')`, (err, rows) => {
		if (err) {
			return console.error(err.message)
		  }
		  res.render("search", { x, fiere: rows })
	})
});

//db.close((err) => {
//	if (err) {
//	  console.error(err.message);
//	}
//	console.log('Close the database connection.');
  //});
