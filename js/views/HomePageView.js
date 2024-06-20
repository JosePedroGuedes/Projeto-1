import { loadAlumni } from "../models/AlmuniModels.js"; // Assuming it's AlumniModels.js
import { loadProjects } from "../models/ProjectModels.js";
import {loadEventos } from "../models/EventosModels.js";


//Exibir os eventos na página inicial
document.addEventListener("DOMContentLoaded", function () {
  loadEventos();

  const eventosContainer = document.getElementById("eventos");

  if (eventosContainer) {
    const eventos = JSON.parse(localStorage.getItem("eventos"));

    if (eventos) {
      eventos.slice(0, 4).forEach(function (evento) {   //dá display dos 4 primeiros eventos da local storage
        const div = document.createElement("div");
        const card = document.createElement("div");
        div.className = "col-md-3";
        card.innerHTML = `
        <a href="${evento.url}" target="_blank">
          <img class="image-item" id="${evento.name}" src="${evento.image}" alt="Event Image">
        </a>
        `;
        div.appendChild(card);
        eventosContainer.appendChild(div);
      });
    }
  }
});



//Exibir os projetos na página inicial
document.addEventListener("DOMContentLoaded", function () {
  loadProjects();

  const projectsContainer = document.getElementById("projects");

  if (projectsContainer) {
    const projects = JSON.parse(localStorage.getItem("projects"));

    if (projects) {
      projects.slice(0, 4).forEach(function (project) {  //
        const div = document.createElement("div");
        const card = document.createElement("div");
        div.className = "col-md-3";
        card.innerHTML = `
        <a href="${project.url}" target="_blank">
          <img class="image-item" id="${project.name}" src="${project.image}" alt="Project Image">
        </a>  
        `;
        div.appendChild(card);
        projectsContainer.appendChild(div);
      });
    }
  }
});



//Exibir os alumni na página inicial
loadAlumni();

const alumniCardsContainer = document.getElementById("alumni-card");

if (alumniCardsContainer) {
  const alumnis = JSON.parse(localStorage.getItem("alumnis"));

  if (alumnis) {
    alumnis.slice(0, 4).forEach(function (alumni) {
      const div = document.createElement("div");
      const card = document.createElement("div");
      div.className = "col-md-3";
      card.className = "card-alumni";
      card.innerHTML = `
        <img class="card-img-top" id="${alumni.name}" src="${alumni.image}" alt="Card image cap">
        </div>
      `;
      div.appendChild(card);
      alumniCardsContainer.appendChild(div);


      card.addEventListener("click", function () {
        // Redirecionar para o HTML com o o nome do alumni que é usado como id
        window.location.href = `http://127.0.0.1:5501/html/alumni.html?id=${alumni.name}`;
      });
    });
  }
}
