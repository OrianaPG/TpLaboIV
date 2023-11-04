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
