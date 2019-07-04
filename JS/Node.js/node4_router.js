var express = require('express');
var router = express.Router();

// define the home page route
router.get('/', function(req, res) {
	res.render('node4_index.ejs');
});
// define the about route
router.get('/about', function(req, res) {
	res.render('node4_about.ejs');
});

module.exports = router;
