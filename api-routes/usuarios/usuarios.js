const express = require('express');
const router = express.Router();
const {
  registrarUsuarioPropietario,
  registrarUsuarioCliente,
} = require('../../controllers/usuarios/usuarios');

router.post('/registrar/propietario', (req, res) => {
  const { usuario, clave, rol } = req.body;

  function propietario(usuario, clave, rol) {
    this.usuario = usuario;
    this.clave = clave;
    this.rol = rol;
  }
  const nuevoPropietario = new propietario(usuario, clave, rol);

  registrarUsuarioPropietario(req, res, nuevoPropietario);
});

router.post('/registrar/cliente', (req, res) => {
  const { usuario, clave, rol } = req.body;
  function cliente(usuario, clave, rol) {
    this.usuario = usuario;
    this.clave = clave;
    this.rol = rol;
  }
  const nuevoCliente = new cliente(usuario, clave, rol);
  registrarUsuarioCliente(req, res, nuevoCliente);
});

router.get('/acceder/propietario', (req, res) => {
  res.send('Acceso para propietarios');
});

router.get('/acceder/cliente', (req, res) => {
  res.send('Acceso para clientes');
});

module.exports = router;
