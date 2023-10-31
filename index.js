/*
let containerlenguajes = document.getElementById("containerlenguajes");

let respuesta = fetch("https://www.preguntapi.dev/api/categories",{
    method:"GET",
    mode:"no-cors",

})
.then(respuesta => respuesta.json())
.then(data => {
    let lenguajes = data.map(lenguajes => 
        `<button class="btn btn-primary">${lenguajes.name}</button>`    
    );
    containerlenguajes.innerHTML = lenguajes.join();
})
.catch(error => console.log("ERROR FATAL", error));
*/

let containerlenguajes = document.getElementById("containerlenguajes");

const url = 'https://corsproxy.io/?' + encodeURIComponent('https://www.preguntapi.dev/api/categories');

fetch(url, {
    method: "GET"
    //mode: "no-cors"  // Cambiado a "cors" para permitir solicitudes a otro dominio.
})
    .then(respuesta => respuesta.json())
    .then(data => {
        let lenguajes = data.categories.map(lenguajes =>
            `<button class="btn btn-primary">${lenguajes.name}</button>`
        );
        containerlenguajes.innerHTML = lenguajes.join(" ");  // Utiliza join("") para unir sin separadores.
    })
    .catch(error => console.log("ERROR FATAL", error));
