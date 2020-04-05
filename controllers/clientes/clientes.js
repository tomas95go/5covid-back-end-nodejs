const {
  insertarDatosCliente,
  relacionarPersonaConCliente,
  buscarCliente,
} = require('../../models/clientes/clientes');

const agregarInformacionCliente = (req, res, nuevoCliente) => {
  insertarDatosCliente(nuevoCliente)
    .then((respuesta) => {
      console.log('ss');
    })
    .catch((error) => {
      res.status(500).send('Hubo un error creando a la persona solicitada');
    });
  buscarCliente(nuevoCliente)
    .then((respuesta) => {
      const idPersona = respuesta[0].idPersona;
      relacionarPersonaConCliente(idPersona)
        .then((respuesta) => {
          console.log('Relacion exitosa!');
        })
        .catch((error) => {
          console.log('Hubo un error en su solicitud');
        });
    })
    .catch((error) => {
      console.log('Hubo un error');
    });
};

module.exports = {
  agregarInformacionCliente: agregarInformacionCliente,
};
