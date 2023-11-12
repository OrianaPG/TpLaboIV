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
    let botonGuardado = document.getElementById(respuestaSeleccionada);
    let respuestas = document.getElementsByClassName('respuestas');
    if (respuestaCorrecta === respuestaSeleccionada) {
        puntuacionActual++;
        //! Cambiarle el color a la respuesta correcta (que es la seleccionada), pasar de btn-warning a btn-success
        botonGuardado.classList.remove("btn-warning");
        botonGuardado.classList.add("btn-success");
    }
    //! Cambiarle el color a la respuesta incorrecta (la seleccionada), pasar de btn-warning a btn-danger
    else {
        botonGuardado.classList.remove("btn-warning");
        botonGuardado.classList.add("btn-danger");
        let botonCorrecto = document.getElementById(respuestaCorrecta);
        //! Cambiarle el color a la respuesta correcta, pasar de btn-warning a btn-success
        botonCorrecto.classList.remove("btn-warning");
        botonCorrecto.classList.add("btn-success");
    }
    //! A los otros botones agregarles el atributo disabled para que no puedan ser clickeados
    for(var i = 0; i < respuestas.length; i++) {
        respuestas[i].disabled = true;
    }
    //! Sacarle el atributo disabled al botón de Siguiente
    let botonSiguiente = document.getElementById("siguientePregunta");
    botonSiguiente.disabled = false;
}

async function levantarPreguntas(url) {
    const respuesta = await fetch(url);
    return respuesta.json();
}

async function obtenerPreguntas(ciclo) {
    preguntas = await levantarPreguntas(url);

    console.log(preguntas);
}

function obtenerUnaPregunta() {
    const pregunta = preguntas[ciclo];
    preguntaRespuestas.innerHTML = `<h1>${pregunta.category.toUpperCase()}</h1>
            <p>Puntuación: ${puntuacionActual} de ${cantidadPreguntas}</p>
            <p>Pregunta: ${ciclo + 1} de ${cantidadPreguntas}</p>
            <p class="bold">${pregunta.question}</p>`;

    // Cargamos la respuesta
    for (let [key, value] of Object.entries(pregunta.answers)) {
        preguntaRespuestas.innerHTML += `<button class="btn btn-warning respuestas" onclick="validarRespuesta('${pregunta.correct_answer}', '${key}')" id="${key}">${value}</button>`;
    }

    if (ciclo + 1 == cantidadPreguntas) {
        agregarModal(puntuacionActual, cantidadPreguntas);
    }

    console.log(pregunta.question);
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



/*
obtenerPreguntas(ciclo);

setTimeout(() => {
    obtenerUnaPregunta();
}, 500);
*/