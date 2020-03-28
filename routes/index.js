/*var express = require('express');
var router = express.Router();
var db = require('../config/db');
var bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', function (req, res) {
  res.send('Hola!');
});

router.post('/register_cliente', function (req, res) {
  const {
    password,
    usuario,
    dni,
    direccion,
    apellido,
    telefono,
    nombre,
  } = req.body;
  if (
    !usuario ||
    !password ||
    !dni ||
    !direccion ||
    !nombre ||
    !apellido ||
    !telefono
  ) {
    return res.status(400).json('Por favor no dejar campos sin rellenar');
  }
  bcrypt.hash(password, saltRounds, function (err, hash) {
    db('usuarios')
      .insert({
        usuario: usuario,
        usrPassword: hash,
      })
      .then((data) => {
        db('personas')
          .insert({
            nombre: nombre + ' ' + apellido,
            dni: dni,
            direccion: direccion,
            telefono: telefono,
          })
          .then((data) => {
            let consulta = 0;
            db.select('idPersona')
              .from('clientes')
              .then((data) => {
                let consulta = 0;
                data.forEach((value) => {
                  consulta = value.idPersona;
                });
                db('clientes')
                  .insert({
                    idPersona: consulta + 1,
                  })
                  .then((data) => {
                    res.send('Datos cargados correctamente');
                  })
                  .catch((error) => {
                    console.log('There is an error with your request: ', error);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log('There is an error with your request: ', error);
          });
      })
      .catch((error) => {
        console.log('There is an error with your request: ', error);
      });
  });
});

router.post('/login', function (req, res) {
  const { password, usuario } = req.body;
  if (!usuario || !password) {
    return res.status(400).json('Usuario o password incorrecto');
  }
  db('usuarios')
    .where({
      usuario: usuario,
    })
    .select('usrPassword')
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].usrPassword);
      if (isValid) {
        res.send(isValid);
      } else {
        return res.status(400).json('Usuario o password incorrecto');
      }
    })
    .catch((error) => {
      'There was an error with your request: ', error;
    });
});

router.get('/listado_negocios', function (req, res) {
  db.from('negocios_rubros')
    .innerJoin('rubro', 'negocios_rubros.idRubro', 'rubro.idRubro')
    .innerJoin('negocios', 'negocios_rubros.idNegocio', 'negocios.idNegocio')
    .then((data) => {
      res.send(data);
    });
});

router.get('/listado_negocios/:rubro', function (req, res, rubro) {
  db.select('descripcion', 'nombre')
    .where('rubro.descripcion', req.params.rubro)
    .from('negocios_rubros')
    .innerJoin('negocios', 'negocios.idNegocio', 'negocios_rubros.idNegocio')
    .innerJoin('rubro', 'rubro.idRubro', 'negocios_rubros.idRubro')
    .then((data) => {
      res.send(data);
    });
});

/*
Funcion de prueba
router.get('/user/:id', function (req, res, id) {
  db.select('nombre')
    .from('duenios')
    .where('duenios.idPersona', req.params.id)
    .innerJoin('personas', function () {
      this.on('duenios.idPersona', 'personas.idPersona');
    })
    .then((data) => {
      res.json({
        error: false,
        data: data,
      });
    });
  //res.end();
});

module.exports = router;/*
