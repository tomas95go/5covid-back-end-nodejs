const { insertarDatosCliente } = require('../../models/clientes/clientes');

const agregarInformacionCliente = (req, res, nuevoCliente) => {
  insertarDatosCliente(nuevoCliente)
    .then((respuesta) => {
      console.log('ss');
    })
    .catch((error) => {
      res.status(500).send('Hubo un error creando a la persona solicitada');
    });
};

module.exports = {
  agregarInformacionCliente: agregarInformacionCliente,
};
