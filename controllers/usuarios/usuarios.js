const { insertarUsuario } = require('../../models/usuarios/usuarios');
const registrarUsuarioPropietario = (req, res, propiteario) => {
  const { usuario, clave, rol } = propiteario;
  if (!usuario || !clave || !rol) {
    res.status(500).send('¡Por favor, no dejar campos sin rellenar!');
  }
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

const registrarUsuarioCliente = (req, res) => {
  res.send('Controlador registrar usuarios');
};

module.exports = {
  registrarUsuarioPropietario: registrarUsuarioPropietario,
};
