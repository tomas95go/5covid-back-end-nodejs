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

const geoLocalizar = (direccionNegocio) => {
  const { instancia, key } = obtenerCredencialesMapsApi();
  return instancia.findPlaceFromText({
    params: {
      input: direccionNegocio,
      inputtype: 'textquery',
      key: key,
    },
    timeout: 1000,
  });
};

const agregarNegocio = (
  req,
  res,
  idPropietario,
  calleNegocio,
  numeroCalleNegocio,
  localidadNegocio,
  provinciaNegocio
) => {
  const probando = `La direccion del negocio es: ${calleNegocio} ${numeroCalleNegocio}, de la localidad ${localidadNegocio} de la provincia de ${provinciaNegocio} pertenece a ${idPropietario}`;
  const direccionNegocio = `${calleNegocio}`;
  const respuestaAPI = geoLocalizar(direccionNegocio);
  respuestaAPI
    .then((data) => {
      console.log(data.data);
    })
    .catch((error) => console.log(error));
  //res.status(200).send(probando);

  //Nombre del negocio
  //Localidad
  //Provincia
  //Pais
};

module.exports = {
  agregarNegocio: agregarNegocio,
};
