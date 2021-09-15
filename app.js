const express = require('express');
const session = require('express-session');
const passport = require('passport');
//const flash = require('connect-flash');


const app = express();

// Passport Config
//require('./config/passport')(passport);

// EJS
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/index'));
app.use('/fiera', require('./routes/fiera'))
app.use('/user', require('./routes/user'));

var url = new URL("http://localhost:3000/fiera/");
url.searchParams.append('q', 'patata');
console.log(url)

// porta
const port = process.env.PORT || 3000;

// Ascolta sulla porta 3000
app.listen(port, console.info(`Ascolto su porta ${port}`));

// app.get('/search', (req, res) => {

// 	console.log(req.params);
// 	db.all(`SELECT * FROM Fiere WHERE (nome LIKE '%${x}%' OR descrizione LIKE '%${x}%' OR tag LIKE '%${x}%')`, (err, rows) => {
// 		if (err) {
// 			return console.error(err.message)
// 		  }
// 		  res.render("search", { x, fiere: rows })
// 	})
// });

