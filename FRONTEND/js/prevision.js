
var config = {
    method: "GET",
    headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjcWlAcGxhaWF1bmRpLm5ldCJ9.QEVuHnz2VytCl0PpA44b08ti-aeAz9GfOFG1tzaA_LEN2kqHcUzBxa8d8xv7RV5imqFB_RDwKAWcwsh-QYOeAkbG9ghiDzTtwi9sD6gcKp_V_snuv08XIvGpZspKbcC6HTcOuCnLMWkRPWEutSiwkFn53n5gUkVK90mtyfisaEM1yE6Xfx105MSrzfBESpt-eNZrDzcIcVmfzUp3ADrVSUglFvRlP911HpH_VDU1tVtfhN9OhDLcaasaB_i-UNxlSdKQv_WR7JJSk6H3YZE6aL--kB3owahHbTAcWYcfxfiUvokkGQ-L2EsAtUAWkZan2DqOTQjB2oA2vYsvgrnV2A',
    }
};

const hoy = new Date();
const año = hoy.getFullYear();
const mes = ('0' + (hoy.getMonth() + 1)).slice(-2); // Sumar 1 al mes porque los meses van de 0 a 11
const dia = ('0' + hoy.getDate()).slice(-2);
const fechaFormateada = `${año}/${mes}/${dia}`;

const mañana = new Date();
mañana.setDate(hoy.getDate() + 1);
const añoMañana = mañana.getFullYear();
const mesMañana = ('0' + (mañana.getMonth() + 1)).slice(-2);
const diaMañana = ('0' + mañana.getDate()).slice(-2);

function mostrarTooltip(lugar) {
    switch (lugar) {
        case "Donosti":
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/donostia/forecast/at/${fechaFormateada}/for/${añoMañana + mesMañana + diaMañana}`, config)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La solicitud no se pudo completar correctamente.");
                    }
                    return response.json();
                })
                .then(data => {
                    prediccion = data.forecastText["SPANISH"]
                    console.log(prediccion);
                })
            break;
        case "Errenteria":
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/errenteria/forecast/at/${fechaFormateada}/for/${añoMañana + mesMañana + diaMañana}`, config)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La solicitud no se pudo completar correctamente.");
                    }
                    return response.json();
                })
                .then(data => {
                    prediccion = data.forecastText["SPANISH"]
                    console.log(prediccion);
                })
            break;
        case "Irun":
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/irun/forecast/at/${fechaFormateada}/for/${añoMañana + mesMañana + diaMañana}`, config)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La solicitud no se pudo completar correctamente.");
                    }
                    return response.json();
                })
                .then(data => {
                    prediccion = data.forecastText["SPANISH"]
                    console.log(prediccion);
                })
            break;
        case "Bilbao":
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/great_bilbao/locations/bilbao/forecast/at/${fechaFormateada}/for/${añoMañana + mesMañana + diaMañana}`, config)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La solicitud no se pudo completar correctamente.");
                    }
                    return response.json();
                })
                .then(data => {
                    prediccion = data.forecastText["SPANISH"]
                    console.log(prediccion);
                })
            break;
        default:
            break;
    }
}