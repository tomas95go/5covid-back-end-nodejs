var express = require('express');
var router = express.Router();
var db = require('../config/db');

router.get('/', function (req, res) {
  db.select()
    .from('duenios')
    .then((data) => {
      res.json({
        error: false,
        data: data,
      });
    });
});

router.get('/user', function (req, res) {
  res.send('/user');
});

router.get('/user/:id', function (req, res, id) {
  db.select('nombre')
    .from('duenios')
    .where('duenios.idPersona', req.params.id)
    .innerJoin('personas', function () {
      this.on('duenios.idPersona', 'personas.idPersona');
    })
    .then((data) => {
      res.json({
        error: false,
        data: data,
      });
    });
  //res.end();
});

module.exports = router;
