{/*

Lo que tiene que devolver el js:
<h1>Lenguaje</h1>
<p>Puntuación: X de XX</p>
<p>Pregunta: X de XX</p>
<p>Pregunta actual</p>

<button>Respuesta A</button>
<button>Respuesta B</button>
<button>Respuesta C</button>
<button>Respuesta D</button>

*/}

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

function obtenerUnaPregunta(){ 
    let puntuacionActual = 0;
    //obtenerPreguntas(ciclo);
    const pregunta = preguntas[ciclo];
    //! El índice arranca a contar en 4
        preguntaRespuestas.innerHTML = `<h1>${pregunta.category.toUpperCase() }</h1>
            <p>Puntuación: ${puntuacionActual} de ${cantidadPreguntas}</p>
            <p>Pregunta: ${ciclo+1} de ${cantidadPreguntas}</p>
            <p id="pregunta">${pregunta.question}</p>`;

    //console.log(preguntas[ciclo].question);
    console.log(pregunta.question);
    ciclo++;
}
obtenerPreguntas(ciclo);

setTimeout(() => {
    obtenerUnaPregunta();
}, 500);
