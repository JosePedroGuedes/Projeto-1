import { loadAlumni } from "../models/AlmuniModels.js";

//Carregar os Alumni da Local Storage e Exibir
loadAlumni();

const alumniCardsContainer = document.getElementById("alumni-card");

if (alumniCardsContainer) {
  const alumnis = JSON.parse(localStorage.getItem("alumnis"));

  if (alumnis) {
    alumnis.forEach(function (alumni) {
      const div = document.createElement("div");
      const card = document.createElement("div");
      div.className = "col-md-3";
      card.className = "card-alumni";
      card.innerHTML = `
        <img class="card-alumni" src="${alumni.image}" alt="Card image cap">
      `;
      div.appendChild(card); 
      alumniCardsContainer.appendChild(div); 
    });
  }
}
