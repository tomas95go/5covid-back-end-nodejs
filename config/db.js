let knex = require('knex')({
  client: 'mysql',

  //Conexión local
  /*connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: '5covid',
  },*/
  //Conexión remota. ClearDB de Heroku.
  connection: {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'be50d8aa2153f8',
    password: '0f15e12e',
    database: 'heroku_e5bb1b27e6461d4',
  },
});

module.exports = knex;
