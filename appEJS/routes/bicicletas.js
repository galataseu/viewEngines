var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('bicicletas', { title: 'Bicicletas' });
});

router.get('/tricicletas', function(req, res, next) {
  res.render('tricicletas', { title: 'Tricicletas' });
});

router.get('/monocicletas', function(req, res, next) {
  res.render('monocicletas', { title: 'Monocicletas' });
});

module.exports = router;
