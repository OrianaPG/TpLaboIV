let containerlenguajes = document.getElementById("containerlenguajes");

const url = 'https://corsproxy.io/?' + encodeURIComponent('https://www.preguntapi.dev/api/categories');

fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        let lenguajes = data.categories.map(lenguajes =>
            `<button class="btn btn-primary lenguajes" name="lenguajes">${lenguajes.name.toUpperCase()}</button>`
        );
        containerlenguajes.innerHTML = lenguajes.join(" ");
    })
    .catch(error => console.log("ERROR FATAL", error));


const empezarQuizButton = document.querySelector(".btn-success");

empezarQuizButton.addEventListener("click", () => {
    // va a la pantalla de preguntas
    // falta guardar variables elegidas por el usuario
    window.location.href = "./quiz.html";
});
