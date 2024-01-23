
const carrusel = document.getElementById("carousel");
let contenidoCarousel = ``;
lugares.forEach(lugar => {
    contenidoCarousel += `<div class="card ${lugar.nombre}" style="display: none;">
                            <div class="cardTitle">
                                <h1>${lugar.nombre}</h1>
                            </div>
                            <div class="informacion">
                                <div class="temperatura">
                                    <img src="imagenes/temperatura.png" alt="">
                                    <p>${lugar.latitud}</p>
                                </div>
                                <div class="humedad">
                                    <img src="imagenes/humedad.png" alt="">
                                    <p>${lugar.longitud}</p>
                                </div>
                            </div>
                            <button onclick="crearGrafico('myChart-${lugar.nombre}')">GRAFICO</button>
                            <div>
                                <canvas id="myChart-${lugar.nombre}" style="display: none;"></canvas>
                            </div>
                          </div>`
    var marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map);
    marker.on('click', function () {
        cards = document.getElementsByClassName("card")
        for (let card of cards) {
            if (lugar.nombre === card.className.split("card ")[1]) {
                if (card.style.display == "none") {
                    card.style.display = "block"
                } else {
                    card.style.display = "none"
                }
            }
        }
    })
});

carrusel.innerHTML = contenidoCarousel;

$("#precipitacion, #viento, #nubes").on('dragstart', function (event) {
    event.originalEvent.dataTransfer.setData("dato", event.target.id);
});

$(".card").on("dragover", function (event) {
    event.preventDefault();
})

$(".card").on("drop", function (event) {
    event.preventDefault();
    dato = event.originalEvent.dataTransfer.getData("dato");
    nombreCard = this.className;
    mostrarInfo(dato, nombreCard);
})

function mostrarInfo(dato, nombreCard) {
    const carta = document.getElementsByClassName(nombreCard)[0]
    const info = carta.getElementsByClassName('informacion')[0]
    let contenidoCard = info.innerHTML
    switch (dato) {
        case "precipitacion":
            if (carta.getElementsByClassName('precipitacion').length == 0) {
                contenidoCard += `
                            <div class="precipitacion">
                                <img src="imagenes/precipitacion.png" alt="">
                                <p>10</p>
                            </div>`
            }
            break;
        case "viento":
            if (carta.getElementsByClassName('viento').length === 0) {
                contenidoCard += `
                            <div class="viento">
                                <img src="imagenes/viento.png" alt="">
                                <p>10</p>
                            </div>`
            }
            break;
        case "nubes":
            if (carta.getElementsByClassName('nubes').length === 0) {
                contenidoCard += `
                            <div class="nubes">
                                <img src="imagenes/nubes.png" alt="">
                                <p>10</p>
                            </div>`
            }
            break;
        default:
            break;
    }
    info.innerHTML = contenidoCard
}