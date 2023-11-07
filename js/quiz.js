category = "javascript"
nivel = "facil"
cantidadPreguntas = 5
let preguntas;

ciclo = 0;
let preguntaRespuestas = document.getElementById("preguntaRespuestas");
const url = 'https://corsproxy.io/?' + encodeURIComponent(`https://www.preguntapi.dev/api/categories/${category}?level=${nivel}&limit=${cantidadPreguntas}`);

async function levantarPreguntas(url) {
    const respuesta = await fetch(url);
    return respuesta.json();
}

async function obtenerPreguntas(ciclo) {
    preguntas = await levantarPreguntas(url);
    let puntuacionActual = 0;

    //for (let indice = 0; indice < preguntas.length; indice++) {
    // Cargamos la pregunta y la puntuación


    // Cargamos la respuesta (https://stackoverflow.com/questions/14379274/how-to-iterate-over-a-javascript-object)
    // for (let [key, value] of Object.entries(pregunta.answers)) {
    //     preguntaRespuestas.innerHTML += `<button class="btn btn-warning">${value}</button>`;
    //     }

    // Chequeamos que la respuesta seleccionada sea la correcta

    //}
    console.log(preguntas);
}

function obtenerUnaPregunta() {
    let puntuacionActual = 0;
    //obtenerPreguntas(ciclo);
    const pregunta = preguntas[ciclo];
    preguntaRespuestas.innerHTML = `<h1>${pregunta.category.toUpperCase()}</h1>
            <p>Puntuación: ${puntuacionActual} de ${cantidadPreguntas}</p>
            <p>Pregunta: ${ciclo + 1} de ${cantidadPreguntas}</p>
            <p class="bold">${pregunta.question}</p>`;


    if (ciclo + 1 == cantidadPreguntas) {
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

    //console.log(preguntas[ciclo].question);
    console.log(pregunta.question);
    ciclo++;
}

function repetirQuiz() {
    // Que te devuelva a la primera pregunta
}

function volverAlInicio() {
    window.location.href = "./index.html";
}

function hacerPromesa() {
    return new Promise((obtenerPreguntas) => {
        setTimeout(() => {
            obtenerUnaPregunta();
        }, 500);
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