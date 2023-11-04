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

let preguntaRespuestas = document.getElementById("preguntaRespuestas");

const url = 'https://corsproxy.io/?' + encodeURIComponent(`https://www.preguntapi.dev/api/categories/${category}?level=${nivel}&limit=${cantidadPreguntas}`);

async function levantarPreguntas(url) {
    const respuesta = await fetch(url);
    
    return respuesta.json();
}

async function obtenerPreguntas() {
    const preguntas = await levantarPreguntas(url);
    let puntuacionActual = 0;

    for (let indice = 0; indice < preguntas.length; indice++) {
        // Cargamos la pregunta y la puntuación
        const pregunta = preguntas[indice];
        //! El índice arranca a contar en 4
        preguntaRespuestas.innerHTML = `<h1>${pregunta.category.toUpperCase() }</h1>
            <p>Puntuación: ${puntuacionActual} de ${cantidadPreguntas}</p>
            <p>Pregunta: ${indice} de ${cantidadPreguntas}</p>
            <p id="pregunta">${pregunta.question}</p>`;

        // Cargamos la respuesta (https://stackoverflow.com/questions/14379274/how-to-iterate-over-a-javascript-object)
        for (let [key, value] of Object.entries(pregunta.answers)) {
            preguntaRespuestas.innerHTML += `<button class="btn btn-warning">${value}</button>`;
            }

        // Chequeamos que la respuesta seleccionada sea la correcta
        
    }

    console.log({preguntas});
}

// Si hace click en "Empezar quiz"
obtenerPreguntas()




// fetch(url)
//     .then(respuesta => respuesta.json())
//     .then(data => {
//         let preguntas = data.map(preguntas =>
//             `<h1>${preguntas.category}</h1>
//             <p>Puntuación: ${puntuacionActual} de ${cantidadPreguntas}</p>
//             <p>Pregunta: ${indice + 1} de ${cantidadPreguntas}</p>
//             <p>Pregunta actual</p>

//             <button>Respuesta A</button>
//             <button>Respuesta B</button>
//             <button>Respuesta C</button>
//             <button>Respuesta D</button>`
//         );
//         preguntaRespuestas.innerHTML = preguntas.join(" ");
//     })
//     .catch(error => console.log("ERROR FATAL", error));