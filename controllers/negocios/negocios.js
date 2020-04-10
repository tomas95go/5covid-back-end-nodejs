const { Client } = require('@googlemaps/google-maps-services-js');

const obtenerCredencialesMapsApi = () => {
  const cliente = new Client({});
  const googleMapsApiKey = 'AIzaSyBDqdCEsP9DEpiCjsjE0gf-v0PMNeNoo7I';
  const credecialesMapsApi = {
    instancia: cliente,
    key: googleMapsApiKey,
  };
  return credecialesMapsApi;
};

const obtenerNegociosSegunTipo = (tipoNegocio, direccionUsuario) => {
  const { instancia, key } = obtenerCredencialesMapsApi();
  return instancia.placesNearby({
    params: {
      location: direccionUsuario,
      radius: 2000,
      language: 'es',
      type: tipoNegocio,
      key: key,
    },
    timeout: 1000,
  });
};

const listadoFarmacias = (req, res, latitud, longitud) => {
  const direccionUsuario = latitud + ',' + longitud;
  const promiseFarmacias = obtenerNegociosSegunTipo(
    'pharmacy',
    direccionUsuario
  );
  return promiseFarmacias
    .then((r) => {
      const { results } = r.data;
      const farmacias = results.map((value, i) => {
        let { name, rating, vicinity } = value;
        rating === undefined ? (rating = 'No disponible') : rating;
        const obj = {
          name: name,
          rating: rating,
          vicinity: vicinity,
        };
        return obj;
      });
      res.status(200).send(farmacias);
      return farmacias;
    })
    .catch((e) => {
      console.log(e);
    });
};

const listadoSuperMercados = (req, res, latitud, longitud) => {
  const direccionUsuario = latitud + ',' + longitud;
  const promiseSuperMercados = obtenerNegociosSegunTipo(
    'supermarket',
    direccionUsuario
  );
  return promiseSuperMercados
    .then((r) => {
      const { results } = r.data;
      const superMercados = results.map((value, i) => {
        let { name, rating, vicinity } = value;
        rating === undefined ? (rating = 'No disponible') : rating;
        const obj = {
          name: name,
          rating: rating,
          vicinity: vicinity,
        };
        return obj;
      });
      res.status(200).send(superMercados);
      return superMercados;
    })
    .catch((e) => {
      console.log(e);
    });
};

const listadoNegocios = (req, res, latitud, longitud) => {
  const farmacias = listadoFarmacias(req, res, latitud, longitud);

  const supermercados = listadoSuperMercados(req, res, latitud, longitud);

  async function combinador(farmacias, supermercados) {
    let listadoCompleto = [];
    farmacias = await farmacias;
    supers = await supermercados;
    listadoCompleto = farmacias.concat(supers);
    res.status(200).send(listadoCompleto);
    return listadoCompleto;
  }
  combinador(farmacias, supermercados);
};

module.exports = {
  listadoNegocios: listadoNegocios,
  listadoFarmacias: listadoFarmacias,
  listadoSuperMercados: listadoSuperMercados,
};
