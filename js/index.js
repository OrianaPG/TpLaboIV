let containerlenguajes = document.getElementById("containerlenguajes");

const url = 'https://corsproxy.io/?' + encodeURIComponent('https://www.preguntapi.dev/api/categories');

fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        let lenguajes = data.categories.map(lenguajes =>
            `<button class="btn btn-primary lenguajes" name="lenguajes" onclick="guardarLenguaje()" value=${lenguajes.name}>${lenguajes.name.toUpperCase()}</button>`
        );
        containerlenguajes.innerHTML = lenguajes.join(" ");
    })
    .catch(error => console.log("ERROR FATAL", error));


function guardarLenguaje() {
    // Levantar el valor del lenguaje
    lenguaje = algo.value;
    localStorage.setItem("lenguaje", lenguaje);
    }

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
