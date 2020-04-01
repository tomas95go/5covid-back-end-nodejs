const router = require('express').Router();
//usuarioOps = usuario operaciones
const usuarioOps = require('./usuarios/usuarios');

router.get('/', (req, res) => {
  res.send(`Bienvenido a "Mi Turno Seguro"`);
});
/**
 * Recibe las operaraciones del usuario, de ahora en adelante todo sera
 * /usuario + la ruta recibida de usuarioOps, por ejemplo, si usuarioOps tiene
 * /registrar, la ruta seria /usuario/registrar
 **/
router.use('/usuario', usuarioOps);

module.exports = router;
