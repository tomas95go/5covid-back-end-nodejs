const db = require('../../config/db');

const insertarDatosCliente = (nuevoCliente) => {
  const { email, dni, direccion, nombre, apellido, telefono } = nuevoCliente;
  return db('personas').insert({
    nombre: nombre,
    dni: dni,
    direccion: direccion,
    telefono: telefono,
  });
};

module.exports = {
  insertarDatosCliente: insertarDatosCliente,
};
