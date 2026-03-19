var express = require('express');
var router = express.Router();

const bicicletas = [
  { id: 1, nome: "Bicicleta Monark", preco: 600.00, img: "https://images.tcdn.com.br/img/img_prod/971467/bicicletas_aro_26_mornak_heal_mk112_1185_1_638aba0be92f7131f5539c859af2fce8.jpg" },
  { id: 2, nome: "Bicicleta Elétrica", preco: 1800.00, img: "https://images.tcdn.com.br/img/img_prod/748717/bicicleta_eletrica_oggi_streetgo_s12_4101_variacao_7197_1_a236e6a3e6cf4abe3c4e63ab28f223cd.png" },
  { id: 3, nome: "Bicicleta Motorizada", preco: 1300.00, img: "https://http2.mlstatic.com/D_NQ_NP_609063-MLA81416803963_122024-O.webp" },
  { id: 4, nome: "Bicicleta Esportiva", preco: 2500.00, img: "https://www.ecompletocdn.com.br/i/fp/1340/1538047_1_1704476586.jpg" }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('bicicletas', 
    { title: 'Bicicletas',
      bicicletas: bicicletas
    }
  );
});

router.get('/tricicletas', function(req, res, next) {
  res.render('tricicletas', { title: 'Tricicletas' });
});

router.get('/monocicletas', function(req, res, next) {
  res.render('monocicletas', { title: 'Monocicletas' });
});

module.exports = router;
