
fetch("http://localhost:8085/api/select")
    .then(response => {
        if (!response.ok) {
            throw new Error("La solicitud no se pudo completar correctamente.");
        }
        return response.json();
    })
    .then(data => {
        lugares = data['lugares']

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
                                    <p>${lugar.temperatura}</p>
                                </div>
                                <div class="humedad">
                                    <img src="imagenes/humedad.png" alt="">
                                    <p>${lugar.humedad}</p>
                                </div>
                            </div>
                            <button onclick="crearGrafico('myChart-${lugar.nombre}')">GRAFICO</button>
                            <div>
                                <canvas id="myChart-${lugar.nombre}" style="display: none;"></canvas>
                            </div>
                          </div>`
            var marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map);
            carrusel.innerHTML = contenidoCarousel;

            marker.on('click', function () {
                cards = document.getElementsByClassName("card")
                for (let card of cards) {
                    if (lugar.nombre === card.className.split("card ")[1]) {
                        lugares = localStorage.getItem("carta");
                        if (lugares !== null) {
                            storage = lugares.split(",");
                        }
                        if (card.style.display == "none") {
                            card.style.display = "block"
                            if (localStorage.getItem("carta")) {
                                if (!storage.includes(lugar.nombre)) {
                                    storage += "," + lugar.nombre
                                    localStorage.setItem("carta", storage)
                                }
                            } else {
                                localStorage.setItem("carta", lugar.nombre)
                            }
                        } else {
                            card.style.display = "none"
                            filtrado = storage.filter(filtro => filtro !== lugar.nombre);
                            localStorage.setItem("carta", filtrado.join(","))
                        }
                    }
                }
            })
        });

        verLocalStorage()

        function verLocalStorage() {
            cards = document.getElementsByClassName("card")
            lugares = localStorage.getItem("carta");
            if (lugares !== null) {
                storage = lugares.split(",");
                for (let card of cards) {
                    if (storage.includes(card.className.split("card ")[1])) {
                        card.style.display = "block"
                    }
                }
            }
        }

        $("#precipitacion, #viento").on('dragstart', function (event) {
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
            var lugares = data['lugares']
            const carta = document.getElementsByClassName(nombreCard)[0]
            const info = carta.getElementsByClassName('informacion')[0]
            let contenidoCard = info.innerHTML
            for (const lugar of lugares) {
                if (lugar.nombre == carta.className.split("card ")[1]) {
                    lugarCarta = lugar
                }
            }
            switch (dato) {
                case "precipitacion":
                    if (carta.getElementsByClassName('precipitacion').length == 0) {
                        contenidoCard += `
                            <div class="precipitacion">
                                <img src="imagenes/precipitacion.png" alt="">
                                <p>${lugarCarta.precipitacion}</p>
                            </div>`
                    }
                    break;
                case "viento":
                    if (carta.getElementsByClassName('viento').length === 0) {
                        contenidoCard += `
                            <div class="viento">
                                <img src="imagenes/viento.png" alt="">
                                <p>${lugarCarta.viento}</p>
                            </div>`
                    }
                    break;
                default:
                    break;
            }
            info.innerHTML = contenidoCard
        }
    })