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
            ¡Muchas gracias por jugar!
            <br>
            Si querés volver a intentarlo con las mismas preguntas, dale a "Repetir quiz". Sino, dale a "Salir".`
}

function validarRespuesta(pregunta, respuestaSeleccionada) {
    if (pregunta.correct_answer === respuestaSeleccionada) {
        return true;
    }
    return false;
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
        preguntaRespuestas.innerHTML += `<button class="btn btn-warning" id="${key}">${value}</button>`;
    }

    //! De alguna manera obtener la respuesta correcta (se me ocurre que con un event listener que guarde el id de la respuesta seleccionada)

    if (validarRespuesta(pregunta, respuestaSeleccionada)) {
        puntuacionActual++;
        //! Cambiarle el color a la respuesta correcta (que es la seleccionada), pasar de btn-warning a btn-success
        //! A los otros botones agregarles el atributo disabled para que no puedan ser clickeados
        //! Sacarle el atributo disabled al botón de Siguiente
    }
    else {
        //! Cambiarle el color a la respuesta correcta, pasar de btn-warning a btn-success
        //! Cambiarle el color a la respuesta incorrecta (la seleccionada), pasar de btn-warning a btn-danger
        //! A los otros botones agregarles el atributo disabled para que no puedan ser clickeados
        //! Sacarle el atributo disabled al botón de Siguiente
    }

    if (ciclo + 1 == cantidadPreguntas) {
        agregarModal(puntuacionActual, cantidadPreguntas);
    }

    console.log(pregunta.question);
    ciclo++;
}

function repetirQuiz() {
    //! Que te devuelva a la primera pregunta
}

function volverAlInicio() {
    window.location.href = "./index.html";
}

function hacerPromesa() {
    return new Promise((obtenerPreguntas) => {
        setTimeout(() => {
            obtenerUnaPregunta();
        }, 1500);
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