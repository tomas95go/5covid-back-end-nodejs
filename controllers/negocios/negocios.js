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

const promesaFarmacias = (direccionUsuario) => {
  //obtFarmacias = obtenerFarmacias
  const obtFarmacias = obtenerNegociosSegunTipo('pharmacy', direccionUsuario);
  //resPromFarmacia = resolverPromesaFarmacia;
  const resPromFarmacia = obtFarmacias
    .then((respuesta) => {
      //results: es el array de la Google Maps API que contiene los datos.
      const { results } = respuesta.data;
      const farmacias = results.map((value, i) => {
        let { name, rating, vicinity, id } = value;
        rating === undefined ? (rating = 'No disponible') : rating;
        const obj = {
          idFarmacia: id,
          name: name,
          rating: rating,
          vicinity: vicinity,
        };
        return obj;
      });
      return farmacias;
    })
    .catch((error) => {
      console.log(error);
    });
  return resPromFarmacia;
};

const promesaSuperMercados = (direccionUsuario) => {
  //obtSupMer = obtenerSuperMercados
  const obtSupMer = obtenerNegociosSegunTipo('supermarket', direccionUsuario);
  //resPromesaSuperMercados;
  const resPromSupMer = obtSupMer
    .then((respuesta) => {
      const { results } = respuesta.data;
      const superMercados = results.map((value, i) => {
        let { name, rating, vicinity, id } = value;
        rating === undefined ? (rating = 'No disponible') : rating;
        const obj = {
          idSupermercado: id,
          name: name,
          rating: rating,
          vicinity: vicinity,
        };
        return obj;
      });
      return superMercados;
    })
    .catch((error) => {
      console.log(error);
    });
  return resPromSupMer;
};

const listadoFarmacias = (req, res, latitud, longitud) => {
  const direccionUsuario = latitud + ',' + longitud;
  //obtenerListaFarmacias
  const obtListaFarmacias = promesaFarmacias(direccionUsuario);
  obtListaFarmacias
    .then((listaFarmacias) => {
      res.status(200).send(listaFarmacias);
    })
    .catch((error) => {
      console.log(error);
    });
};

const listadoSuperMercados = (req, res, latitud, longitud) => {
  const direccionUsuario = latitud + ',' + longitud;
  //obtListaSupMer = obtenerListaSuperMercados
  const obtListaSupMer = promesaSuperMercados(direccionUsuario);
  obtListaSupMer
    .then((listaSuperMercados) => {
      res.status(200).send(listaSuperMercados);
    })
    .catch((error) => {
      console.log(error);
    });
};

const combinarListados = (direccionUsuario) => {
  const obtListaSupMer = promesaSuperMercados(direccionUsuario);
  const obtListaFarmacias = promesaFarmacias(direccionUsuario);
  const listaSuperMercados = obtListaSupMer
    .then((listadoSuperMercados) => {
      return listadoSuperMercados;
    })
    .catch((error) => {
      console.log(error);
    });
  const listaFarmacias = obtListaFarmacias
    .then((listadoFarmacias) => {
      return listadoFarmacias;
    })
    .catch((error) => {
      console.log(error);
    });
  const listadoCompleto = Promise.all([listaSuperMercados, listaFarmacias]);
  return listadoCompleto;
};

const listadoNegocios = (req, res, latitud, longitud) => {
  const direccionUsuario = latitud + ',' + longitud;
  const listaNegocios = combinarListados(direccionUsuario);
  let listaTotalDeNegocios = [];
  listaNegocios
    .then((listadoCompleto) => {
      let longitudListado = listadoCompleto.length;
      let i = 0;
      let comparador = longitudListado - 1;
      //Mientras que i sea menos al comparador, seguir concatenando los arrays.
      do {
        listaTotalDeNegocios = listadoCompleto[i].concat(
          listadoCompleto[i + 1]
        );
        i++;
      } while (i < comparador);
      res.status(200).send(listaTotalDeNegocios);
    })
    .catch((error) => {
      console.log(error);
    });
};

const listadoNegociosOrdenadoPorRanking = (req, res, latitud, longitud) => {
  const promiseListadoNegocios = listadoNegocios(req, res, latitud, longitud);
  promiseListadoNegocios.then((data) => {
    const listadoNegociosOrdenadoPorRanking = data.sort(function (a, b) {
      if (a.rating === 'No disponible') {
        a.rating = 0;
      }
      if (b.rating === 'No disponible') {
        b.rating = 0;
      }
      if (a.rating > b.rating) {
        return 1;
      }
      if (a.rating < b.rating) {
        return -1;
      }
      return 0;
    });
    res.status(200).send(listadoNegociosOrdenadoPorRanking.reverse());
  });
};

module.exports = {
  listadoNegocios: listadoNegocios,
  listadoFarmacias: listadoFarmacias,
  listadoSuperMercados: listadoSuperMercados,
  listadoNegociosOrdenadoPorRanking: listadoNegociosOrdenadoPorRanking,
};
