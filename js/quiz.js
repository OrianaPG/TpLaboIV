category = localStorage.getItem("lenguaje");
nivel = localStorage.getItem("dificultad");
cantidadPreguntas = localStorage.getItem("cantidadPreguntas")

let preguntas;
let puntuacionActual = 0;
let ciclo = 0;

let preguntaRespuestas = document.getElementById("preguntaRespuestas");

const url = 'https://corsproxy.io/?' + encodeURIComponent(`https://www.preguntapi.dev/api/categories/${category}?level=${nivel}&limit=${cantidadPreguntas}`);

function agregarModal(puntuacionActual, cantidadPreguntas) {
    let botonSiguiente = document.getElementById("siguientePregunta");
    botonSiguiente.setAttribute("data-bs-toggle", "modal");
    botonSiguiente.setAttribute("data-bs-target", "#staticBackdrop");

    let modal = document.getElementById("modal")
    modal.innerHTML =
        `Tu puntuación final fue de <span class="bold">${puntuacionActual}/${cantidadPreguntas}</span>.
            <br>
            ¡Muchas gracias por jugar!`
}

function validarRespuesta(respuestaCorrecta, respuestaSeleccionada) {
    let botonSeleccionado = document.getElementById(respuestaSeleccionada);
    let respuestas = document.getElementsByClassName('respuestas');
    if (respuestaCorrecta === respuestaSeleccionada) {
        puntuacionActual++;
        // Cambiamos el color a la respuesta correcta
        botonSeleccionado.classList.remove("btn-warning");
        botonSeleccionado.classList.add("btn-success");
    }
    else {
        // Cambiamos el color a la respuesta incorrecta
        botonSeleccionado.classList.remove("btn-warning");
        botonSeleccionado.classList.add("btn-danger");
        let botonCorrecto = document.getElementById(respuestaCorrecta);
        // Cambiamos el color a la respuesta correcta
        botonCorrecto.classList.remove("btn-warning");
        botonCorrecto.classList.add("btn-success");
    }
    // Desactivamos todos los botones de respuestas
    for (let i = 0; i < respuestas.length; i++) {
        respuestas[i].disabled = true;
    }
    // Activamos el botón "Siguiente"
    let botonSiguiente = document.getElementById("siguientePregunta");
    botonSiguiente.disabled = false;
}

async function levantarPreguntas(url) {
    const respuesta = await fetch(url).catch(error => console.log("ERROR FATAL:", error));
    return respuesta.json();
}

async function obtenerPreguntas(ciclo) {
    preguntas = await levantarPreguntas(url);
}

function obtenerUnaPregunta() {
    let botonSiguiente = document.getElementById("siguientePregunta");
    botonSiguiente.disabled = true;

    const pregunta = preguntas[ciclo];
    preguntaRespuestas.innerHTML = `<h1 class="bold">${pregunta.category.toUpperCase()}</h1>
    <p class="text-body-secondary">Puntuación: ${puntuacionActual} de ${cantidadPreguntas}</p>
    <p class="text-body-secondary">Pregunta: ${ciclo + 1} de ${cantidadPreguntas}</p>
    <p class="bold">${pregunta.question}</p>`;
    
    // Cargamos la respuesta
    for (let [key, value] of Object.entries(pregunta.answers)) {
        preguntaRespuestas.innerHTML += `<button class="btn btn-warning mb-2 respuestas w-75" onclick="validarRespuesta('${pregunta.correct_answer}', '${key}')" id="${key}">${value}</button> <br>`;
    }
    
    if (ciclo + 1 == cantidadPreguntas) {
        agregarModal(puntuacionActual, cantidadPreguntas);
    }

    ciclo++;
}

function volverAlInicio() {
    window.location.href = "./index.html";
}

function hacerPromesa() {
    return new Promise((obtenerPreguntas) => {
        setTimeout(() => {
            obtenerUnaPregunta();
        }, 100);
    });
};

obtenerPreguntas()
    .then(() => hacerPromesa());
