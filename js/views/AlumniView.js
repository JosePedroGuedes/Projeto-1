import { loadAlumni } from "../models/AlmuniModels.js";





loadAlumni();

const urlParams = new URLSearchParams(window.location.search);
const alumniName = urlParams.get("id");


const alumniInfoContainer = document.getElementById("alumni-info");

if (alumniInfoContainer) {
  const alumnis = JSON.parse(localStorage.getItem("alumnis"));

  if (alumnis && alumniName) {
    const alumni = alumnis.find((a) => a.name === alumniName); 

    if (alumni) {
      alumniInfoContainer.innerHTML = `
        <div class="col-md-3">
          <img class="img-fluid" src="${alumni.image}" alt="${alumni.name}">
        </div>

        <div class="col-md-9 align-title">
          <h1 class="title">${alumni.name}</h1>
          <h3 class="sub-title">${alumni.subtitle}</h3>
        </div>

        <p class="description">${alumni.description}</p>
      `;
    } else {
      alumniInfoContainer.innerHTML = `<p>Alumni not found.</p>`;
    }
  } else {
    alumniInfoContainer.innerHTML = `<p>Alumni ID not provided.</p>`;
  }
}



//Carregar os Alumni da Local Storage e Exibir aqueles que não são o alumni atual

const alumniCardsContainer = document.getElementById("alumni-card");

if (alumniCardsContainer) {
  const alumnis = JSON.parse(localStorage.getItem("alumnis"));

  
  if (alumnis) {

    alumnis.filter((alumni) => alumni.name !== alumniName).forEach(function (alumni) {

        const div = document.createElement("div");
        div.className = "card-alumni";
        div.innerHTML = `
          <img class="card-img img-fluid" src="${alumni.image}" alt="Card image cap">
        `;
        alumniCardsContainer.appendChild(div);

        div.addEventListener("click", function () {
          window.location.href = `http://127.0.0.1:5501/html/alumni.html?id=${alumni.name}`;
        });
      });
  } else {
    alumniCardsContainer.innerHTML = `<p>No alumni data available.</p>`;
  }
}
