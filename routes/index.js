var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req,res) => {
  	db.all("SELECT * FROM Fiere ORDER BY id limit 5", [], (err, rows) => {
    	if (err) {
    	  return console.error(err.message)
   		}
		db.all("SELECT news FROM News ORDER BY timestamp DESC", [], (err, righe) => {
			if (err) {
				return console.error(err.message)
			}
			res.render('index', {fiere: rows, news: righe})
	})
  })
});

module.exports = router;
