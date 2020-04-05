const { insertarUsuario } = require('../../models/usuarios/usuarios');

const registrarUsuarioPropietario = (req, res, propiteario) => {
  insertarUsuario(propiteario)
    .then((respuesta) => {
      res.status(200).send('¡Usuario creado exitosamente!');
    })
    .catch((error) => {
      const { code, errno, sqlMessage, sqlState } = error;
      mensajeError = `Hay un error, por favor, contactar al desarrollador. Codigo: ${code}, Numero: ${errno}, MensajeSQL: ${sqlMessage}, EstadoSQL: ${sqlState}`;
      res.status(500).send(mensajeError);
    });
};

const registrarUsuarioCliente = (req, res, usuario) => {
  insertarUsuario(usuario)
    .then((respuesta) => {
      res.status(200).send('¡Usuario creado exitosamente!');
    })
    .catch((error) => {
      const { code, errno, sqlMessage, sqlState } = error;
      mensajeError = `Hay un error, por favor, contactar al desarrollador. Codigo: ${code}, Numero: ${errno}, MensajeSQL: ${sqlMessage}, EstadoSQL: ${sqlState}`;
      res.status(500).send(mensajeError);
    });
};

module.exports = {
  registrarUsuarioPropietario: registrarUsuarioPropietario,
  registrarUsuarioCliente: registrarUsuarioCliente,
};
