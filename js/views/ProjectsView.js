import { loadProjects } from "../models/ProjectModels.js";
import { loadEventos } from "../models/EventosModels.js";





document.addEventListener("DOMContentLoaded", function () {
    loadProjects();

    const projectsContainer = document.getElementById("projects");

    if (projectsContainer) {
        const projects = JSON.parse(localStorage.getItem("projects"));

        if (projects) {
            projects.forEach(function (project) {
                const div = document.createElement("div");
                div.className = "card";
                div.style.width = "20rem";

                div.innerHTML = `
                    <img class="card-img-top" src="${project.image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${project.name}</h5>
                        <a href="${project.url}" target="_blank" class="btn btn-primary">Ver Projeto</a>
                    </div>
                `;

                projectsContainer.appendChild(div);
            });
        }
    }
});




document.addEventListener("DOMContentLoaded", function () {
    loadEventos();

    const eventsContainer = document.getElementById("events");

    if (eventsContainer) {
        const events = JSON.parse(localStorage.getItem("eventos"));

        if (events) {
            events.forEach(function (event) {
                const div = document.createElement("div");
                div.className = "card";
                div.style.width = "20rem";

                div.innerHTML = `
                    <img class="card-img-top" src="${event.image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.description}</p>
                        <a href="${event.url}" target="_blank" class="btn btn-primary">Saber Mais</a>
                    </div>
                `;
                eventsContainer.appendChild(div);
            });
        }
    }
});



