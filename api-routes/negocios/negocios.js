const express = require('express');

const router = express.Router();

const {
  listadoNegocios,
  listadoFarmacias,
  listadoSuperMercados,
  listadoNegociosOrdenadoPorRanking,
} = require('../../controllers/negocios/negocios');

router.post('/listado', (req, res) => {
  const { latitud, longitud } = req.body;
  listadoNegocios(req, res, latitud, longitud);
});

router.post('/filtrar/farmacias', (req, res) => {
  const { latitud, longitud } = req.body;
  listadoFarmacias(req, res, latitud, longitud);
});

router.post('/filtrar/supermercados', (req, res) => {
  const { latitud, longitud } = req.body;
  listadoSuperMercados(req, res, latitud, longitud);
});

router.post('/filtrar/ranking', (req, res) => {
  const { latitud, longitud } = req.body;
  listadoNegociosOrdenadoPorRanking(req, res, latitud, longitud);
});

module.exports = router;
