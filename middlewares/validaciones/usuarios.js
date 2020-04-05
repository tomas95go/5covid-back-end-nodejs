const { check, validationResult } = require('express-validator');

const validarCamposUsuarioCliente = [
  check('clave')
    .isLength({ min: 5 })
    .withMessage('La clave debe contener al menos 5 caracteres'),
];

const validarUsuarioCliente = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const enviarMensajesValidaciones = errors.array();
    const mensajes = enviarMensajesValidaciones.map((value) => {
      return value.msg;
    });
    return mensajes;
  } else {
    return false;
  }
};

module.exports = {
  validarCamposUsuarioCliente: validarCamposUsuarioCliente,
  validarUsuarioCliente: validarUsuarioCliente,
};
