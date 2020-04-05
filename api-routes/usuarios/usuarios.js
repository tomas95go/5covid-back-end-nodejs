const express = require('express');

const router = express.Router();

const {
  validarCamposUsuarioCliente,
  validarUsuarioCliente,
} = require('../../middlewares/validaciones/usuarios');

const {
  registrarUsuarioPropietario,
  registrarUsuarioCliente,
} = require('../../controllers/usuarios/usuarios');

const {
  agregarInformacionCliente,
} = require('../../controllers/clientes/clientes');

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

/* 
Para validar se puede hacer con async await o pasando un array de validaciones.
Con el array quedaria: 
router.post('/registrar/cliente',validarCamposUsuarioCliente, (req, res) => {}
ambos son middlewares
*/
router.post('/registrar/cliente', async (req, res) => {
  await validarCamposUsuarioCliente(req);
  const mensajesValidaciones = validarUsuarioCliente(req, res);
  const {
    usuario,
    clave,
    rol,
    email,
    dni,
    direccion,
    nombre,
    apellido,
    telefono,
  } = req.body;

  function cliente(usuario, clave, rol) {
    this.usuario = usuario;
    this.clave = clave;
    this.rol = rol;
    this.email = email;
    this.dni = dni;
    this.direccion = direccion;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
  }

  const nuevoCliente = new cliente(
    usuario,
    clave,
    rol,
    email,
    dni,
    direccion,
    nombre,
    apellido,
    telefono
  );

  if (mensajesValidaciones !== false) {
    res.status(422).json(mensajesValidaciones);
  } else {
    registrarUsuarioCliente(req, res, nuevoCliente);
    agregarInformacionCliente(req, res, nuevoCliente);
  }
});

router.get('/acceder/propietario', (req, res) => {
  res.send('Acceso para propietarios');
});

router.get('/acceder/cliente', (req, res) => {
  res.send('Acceso para clientes');
});

module.exports = router;
