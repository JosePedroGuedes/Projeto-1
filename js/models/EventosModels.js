let eventos = [];

//GUARDAR EVENTO NA LOCAL STORAGE
export function loadEventos() {
    if (localStorage.eventos) {
        const tempEventos = JSON.parse(localStorage.eventos);
        for (let evento of tempEventos) {
            eventos.push(new Eventos(evento.name, evento.description, evento.image, evento.url));
        }
    } else {
        eventos = [];
    }
}

//ADICIONAR EVENTO
export function addEventos(name, description, image, url) {
    let evento = JSON.parse(localStorage.getItem("eventos")) || [];
    evento.push({ name, description, image, url });
    localStorage.setItem("eventos", JSON.stringify(evento));
}

//EDITAR EVENTO
export function editEventos(oldName, newName, newDescription, newImage, newUrl) {
    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

    const index = eventos.findIndex(evento => evento.name === oldName);

    if (index !== -1) {
        eventos[index].name = newName;
        eventos[index].description = newDescription;
        eventos[index].image = newImage;
        eventos[index].url = newUrl;

        localStorage.setItem("eventos", JSON.stringify(eventos));
    } else {
        console.error("Evento not found");
    }
}

//ELEMINAR EVENTO
export function removeEventos(name) {
    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    let updatedEventos = eventos.filter(evento => evento.name !== name);
    localStorage.setItem("eventos", JSON.stringify(updatedEventos));
}

class Eventos {
    name = "";
    description = "";
    image = "";
    url = ""

    constructor(name, description, image, url) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.url = url;
    }
}