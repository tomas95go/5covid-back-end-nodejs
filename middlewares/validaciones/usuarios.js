const { check, validationResult } = require('express-validator');

async function validarCamposUsuarioCliente(req) {
  await check('email')
    .exists({ checkFalsy: true })
    .withMessage('El email no debe estar vacio')
    .run(req);
  await check('email')
    .isEmail()
    .withMessage('Debe ser un email valido')
    .run(req);
  await check('usuario')
    .exists({ checkFalsy: true })
    .withMessage('El usuario no debe estar vacio')
    .run(req);
  await check('dni')
    .exists({ checkFalsy: true })
    .withMessage('El dni no debe estar vacio')
    .run(req);
  await check('dni').isInt().withMessage('El dni debe ser un numero').run(req);
  await check('dni')
    .isLength({ min: 6, max: 10 })
    .withMessage('El dni debe contener entre 6 y 10 caracteres')
    .run(req);
  await check('direccion')
    .exists({ checkFalsy: true })
    .withMessage('La direccion no debe estar vacia')
    .run(req);
}

const validarUsuarioCliente = (req) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    const enviarMensajesValidaciones = errores.array();
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
