const db = require('../../config/db');
const bcrypt = require('bcrypt');

const encriptarClave = (clave, saltRounds) => {
  const claveEncriptada = bcrypt.hashSync(clave, saltRounds);
  return claveEncriptada;
};

const insertarUsuario = (propietario) => {
  const { usuario, clave } = propietario;
  const saltRounds = 10;
  const claveEncriptada = encriptarClave(clave, saltRounds);
  return db('usuarios').insert({
    usuario: usuario,
    usrPassword: claveEncriptada,
  });
};

module.exports = {
  insertarUsuario: insertarUsuario,
};
