localStorage.clear()

const url = 'https://corsproxy.io/?' + encodeURIComponent('https://www.preguntapi.dev/api/categories');

function guardarLenguaje(name) {
    // Chequea que no haya un lenguaje ya guardado
    let lenguajeGuardado = localStorage.getItem("lenguaje");
    
    // Si lo hay, lo devuelve a sus propiedades normales
    if (lenguajeGuardado)
    {
        let botonGuardado = document.getElementById(lenguajeGuardado);
        botonGuardado.classList.remove("btn-info");
        botonGuardado.classList.add("btn-primary");
    }

    // Guarda el lenguaje seleccionado
    let lenguaje = name;

    localStorage.setItem("lenguaje", lenguaje);

    // Agrega nuevas propiedades
    boton = document.getElementById(lenguaje);
    boton.classList.remove("btn-primary");
    boton.classList.add("btn-info");
    boton.classList.add("text-white");
    boton.classList.add("old");
}

let containerlenguajes = document.getElementById("containerlenguajes");

fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        let lenguajes = data.categories.map(lenguajes =>
            `<button class="btn btn-primary lenguajes" name="lenguajes" id=${lenguajes.name} onclick="guardarLenguaje('${lenguajes.name}')" value=${lenguajes.name}>${lenguajes.name.toUpperCase()}</button>`
        );
        containerlenguajes.innerHTML = lenguajes.join(" ");
    })
    .catch(error => console.log("ERROR FATAL:", error));

const empezarQuizButton = document.getElementById("empezarQuiz");

empezarQuizButton.addEventListener("click", () => {
    // Chequea que se haya seleccionado un lenguaje
    let lenguajeGuardado = localStorage.getItem("lenguaje");

    if (lenguajeGuardado) {
        // Guarda variables elegidas por el usuario
        let dificultad = document.getElementById("dificultad").value;
        let cantidadPreguntas = document.getElementById("cantidadDePreguntas").value;
    
        localStorage.setItem("dificultad", dificultad);
        localStorage.setItem("cantidadPreguntas", cantidadPreguntas);
    
        // Va a la pantalla de preguntas
        window.location.href = "./quiz.html";
    }
    else {
        // Muestra que falta seleccionar lenguaje
        let faltaCargarLenguaje = document.getElementById("faltaCargarLenguaje");
        faltaCargarLenguaje.classList.remove("ocultar");
    }
});
