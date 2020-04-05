const db = require('../../config/db');

const buscarCliente = (nuevoCliente) => {
  const { email } = nuevoCliente;
  return db('personas')
    .where({
      email: email,
    })
    .select('idPersona');
};

const insertarDatosCliente = (nuevoCliente) => {
  const { email, dni, direccion, nombre, apellido, telefono } = nuevoCliente;
  return db('personas').insert({
    nombre: nombre,
    apellido: apellido,
    email: email,
    dni: dni,
    direccion: direccion,
    telefono: telefono,
  });
};

const relacionarPersonaConCliente = (idPersona) => {
  return db('clientes').insert({ idPersona: idPersona });
};

module.exports = {
  insertarDatosCliente: insertarDatosCliente,
  relacionarPersonaConCliente: relacionarPersonaConCliente,
  buscarCliente: buscarCliente,
};
