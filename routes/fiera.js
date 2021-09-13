var express = require('express');
var router = express.Router();

/* GET Fiera dal ID. */
router.get('/:id', (req, res) => {
	db.get("SELECT * FROM Fiere WHERE id = " + req.params.id, (err, row) => {
		if (err) {
			return console.error(err.message)
		  }
		  res.render("fiera", { fiera: row })
	})
});

module.exports = router;
