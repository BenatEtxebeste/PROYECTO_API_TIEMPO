
const provincias =
{
    Gipuzkoa: {
        id: 20,
        municipios: {
            Donosti: 20069,
            Errenteria: 20067,
            Irun: 20045
        }
    },
    Bizkaia: {
        id: 48,
        municipios: {
            Bilbo: 48020
        }
    }
}


// setInterval(() => {
recogerDatos()
// }, 10000);

function recogerDatos() {
    for (const provincia in provincias) {
        for (const municipio in provincias[provincia]) {
            for (const ciudad in provincias[provincia][municipio]) {
                fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${provincias[provincia].id}/municipios/${provincias[provincia][municipio][ciudad]}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("La solicitud no se pudo completar correctamente.");
                        }
                        return response.json();
                    })
                    .then(data => {
                        nombre = data.municipio["NOMBRE"]
                        latitud = data.municipio["LATITUD_ETRS89_REGCAN95"]
                        longitud = data.municipio["LONGITUD_ETRS89_REGCAN95"]
                        temperatura = data.temperatura_actual
                        humedad = data.humedad
                        precipitacion = data.precipitacion
                        viento = data.viento
                        nubes = data.stateSky["description"]
                        fetch(`http://localhost:8085/api/update?nombre=${nombre}&latitud=${latitud}&longitud=${longitud}&temperatura=${temperatura}&humedad=${humedad}&precipitacion=${precipitacion}&viento=${viento}&nubes=${nubes}`, {
                            method: 'POST',
                            headers: {
                                'Access-Control-Allow-Origin': '*'
                            },
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('La solicitud no se pudo completar correctamente.');
                                }
                                return response.json();
                            })
                            .then(data => {
                                // Manejar la respuesta del servidor si es necesario
                                console.log(data);
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    })
            }
        }
    }
}