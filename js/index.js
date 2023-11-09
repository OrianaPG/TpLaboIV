let containerlenguajes = document.getElementById("containerlenguajes");

const url = 'https://corsproxy.io/?' + encodeURIComponent('https://www.preguntapi.dev/api/categories');

function guardarLenguaje(name) {
    
    lenguaje = name;
    old = localStorage.getItem("lenguaje");
    botonOld = document.getElementById(old);
    botonOld.classList.remove("btn-info");
    //botonOld.classList.remove("btn-primary");
    botonOld.classList.add("btn-primary");

    localStorage.setItem("lenguaje", lenguaje);
    boton = document.getElementById(lenguaje);
    boton.classList.remove("btn-info");
    boton.classList.remove("btn-primary");
    boton.classList.add("btn-info");
    }


fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        let lenguajes = data.categories.map(lenguajes =>
            `<button class="btn btn-primary lenguajes" name="lenguajes" id=${lenguajes.name} onclick="guardarLenguaje('${lenguajes.name}')" value=${lenguajes.name}>${lenguajes.name.toUpperCase()}</button>`
        );
        containerlenguajes.innerHTML = lenguajes.join(" ");
    })
    .catch(error => console.log("ERROR FATAL", error));




const empezarQuizButton = document.getElementById("empezarQuiz");
empezarQuizButton.addEventListener("click", () => {
    // Guarda variables elegidas por el usuario
    let dificultad = document.getElementById("dificultad").value;
    let cantidadPreguntas = document.getElementById("cantidadDePreguntas").value;

    localStorage.setItem("dificultad", dificultad);
    localStorage.setItem("cantidadPreguntas", cantidadPreguntas);

    // Va a la pantalla de preguntas
    window.location.href = "./quiz.html";
});
