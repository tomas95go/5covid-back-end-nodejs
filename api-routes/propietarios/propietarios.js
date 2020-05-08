const express = require('express');

const router = express.Router();

const {
  validarCamposUsuarioCliente,
  validarUsuarioCliente,
} = require('../../middlewares/validaciones/usuarios');

const {
  agregarNegocio,
} = require('../../controllers/propietarios/propietarios');

const {
  agregarInformacionCliente,
} = require('../../controllers/clientes/clientes');

router.get('/administrar', (req, res) => {
  res.send('Bienvenido al panel para propietarios');
});

router.post('/administrar/agregarnegocio', (req, res) => {
  const {
    idPropietario,
    nombreNegocio,
    localidadNegocio,
    provinciaNegocio,
  } = req.body;
  agregarNegocio(
    req,
    res,
    idPropietario,
    nombreNegocio,
    localidadNegocio,
    provinciaNegocio
  );
});

module.exports = router;
