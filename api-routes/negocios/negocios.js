const express = require('express');
const { Client } = require('@googlemaps/google-maps-services-js');

const router = express.Router();

router.get('/saludo', (req, res) => {
  const cliente = new Client({});
  const googleMapsApiKey = 'AIzaSyBDqdCEsP9DEpiCjsjE0gf-v0PMNeNoo7I';
  const lugarDeEjemplo = 'Farmacity, Moreno 806, P3600 OCZ, Formosa';
  //Latitud y longitud de mi casa: -26.1774637,-58.1730013
  const latitude = -26.1774637;
  const longitude = -58.1730013;
  const direccionCasa = latitude + ',' + longitude;
  console.log(direccionCasa);
  cliente
    .placesNearby({
      params: {
        location: direccionCasa,
        radius: 2000,
        language: 'es',
        type: 'pharmacy',
        key: googleMapsApiKey,
      },
      timeout: 1000, // milliseconds
    })
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
      console.log('Listado de farmacias: ', farmacias);
    })
    .catch((e) => {
      console.log(e);
    });
  res.send(
    '<a href="https://maps.google.com/maps/contrib/105157911653992945215"></a>'
  );
});

module.exports = router;
