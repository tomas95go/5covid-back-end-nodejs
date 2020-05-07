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
    calleNegocio,
    numeroCalleNegocio,
    localidadNegocio,
    provinciaNegocio,
  } = req.body;
  agregarNegocio(
    req,
    res,
    idPropietario,
    calleNegocio,
    numeroCalleNegocio,
    localidadNegocio,
    provinciaNegocio
  );
});

module.exports = router;
