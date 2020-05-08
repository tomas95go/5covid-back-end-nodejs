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

const buscarNegocio = (parametroBusqueda) => {
  const { instancia, key } = obtenerCredencialesMapsApi();
  return instancia.findPlaceFromText({
    params: {
      input: parametroBusqueda,
      inputtype: 'textquery',
      fields: ['place_id', 'name', 'formatted_address'],
      key: key,
    },
    timeout: 1000,
  });
};

const agregarNegocio = (
  req,
  res,
  idPropietario,
  nombreNegocio,
  localidadNegocio,
  provinciaNegocio
) => {
  const parametroBusqueda = `${nombreNegocio}, ${localidadNegocio}, ${provinciaNegocio}`;
  const realizarBusqueda = buscarNegocio(parametroBusqueda);

  realizarBusqueda
    .then((respuestaAPI) => {
      const { candidates } = respuestaAPI.data;

      const negociosEncontrados = candidates.map((value) => {
        const datosNegocio = {
          idConfirmado: value.place_id,
          nombreConfirmado: value.name,
          direccionConfirmada: value.formatted_address,
        };

        return datosNegocio;
      });

      res.status(200).send(negociosEncontrados);
    })
    .catch((error) => console.log(error));
};

module.exports = {
  agregarNegocio: agregarNegocio,
};
