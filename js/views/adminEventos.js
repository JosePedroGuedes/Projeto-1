// Import functions from EventosModels module
import { loadEventos, addEventos, editEventos, removeEventos } from "../models/EventosModels.js";

// ADMIN PAGE EVENTOS OPTIONS


document.getElementById("eventos").style.backgroundColor = "#29445F";


document.getElementById("users").style.backgroundColor = "";
document.getElementById("projects").style.backgroundColor = "";
document.getElementById("escape-room").style.backgroundColor = "";
document.getElementById("alumni").style.backgroundColor = "";


const userTable = document.querySelector("#userTable");
const projectTable = document.querySelector("#projectTable");

if (userTable) {
  userTable.style.display = "none";
  document.getElementById("create-btn").style.display = "block";
}

if (projectTable) {
  projectTable.style.display = "none";
  document.getElementById("create-btn").style.display = "block";
}


const eventosTable = document.getElementById("eventosTable");
if (eventosTable) {
  eventosTable.style.display = "block";
  document.getElementById("create-btn").style.display = "block";
}


document.getElementById("create-btn").onclick = function () {
  document.getElementById("createEvent").style.display = "block";

  const imageUpload = document.getElementById("imageUploadCreateEvent");
  imageUpload.addEventListener("change", function () {
    const file = imageUpload.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const newImage = e.target.result;
      const imagePreview = document.createElement("img");
      imagePreview.src = newImage;
      imagePreview.style.maxWidth = "200px";
      const imageContainer = document.getElementById("imagePreviewContainerEvent");
      imageContainer.innerHTML = "";
      imageContainer.appendChild(imagePreview);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  });

  const createEventBtn = document.getElementById("createEventtbtn");
  createEventBtn.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const url = document.getElementById("url").value;
    const image = document.getElementById("imageUploadCreateEvent").src;
    
    
    addEventos(name, description, image, url);
    
    
    location.reload();
  });

  document.getElementById("close-create").addEventListener("click", function () {
    document.getElementById("createEvent").style.display = "none";
  });
};


loadEventos();
renderEventos();

function renderEventos() {
    const eventos = JSON.parse(localStorage.getItem("eventos"));
    const tbody = eventosTable.querySelector("tbody");
    const thead = eventosTable.querySelector("thead");
  
    if (thead) {
      thead.innerHTML = `
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Imagem</th>
          <th>URL</th>
          <th>Ações</th>
        </tr>
      `;
    }
  
    if (tbody && eventos) {
      tbody.innerHTML = "";
      eventos.forEach(function(evento) {
        const row = tbody.insertRow();
        row.innerHTML = `
          <td>${evento.name}</td>
          <td>${evento.description}</td>
          <td><img src="${evento.image}" style="max-width: 100px; max-height: 100px;"></td>
          <td>${evento.url}</td>
          <td>
            <button class="btn btn-info btn-sm edit">Editar</button>
            <button class="btn btn-danger btn-sm remove">Remover</button>
          </td>
        `;
      });
  
      
      tbody.removeEventListener("click", handleEventosActions);
      tbody.addEventListener("click", handleEventosActions);
    } else {
      console.error("Eventos not found in localStorage or eventosTable not found");
    }
  }

function handleEventosActions(event) {
  const row = event.target.closest("tr");

  if (!row) return;

  if (event.target.classList.contains("remove")) {
    const name = row.cells[0].innerText;
    if (confirm("Are you sure you want to delete this Evento?")) {
      
      removeEventos(name);
      row.remove();
      alert("Evento removed");
    }
  }

  if (event.target.classList.contains("edit")) {
    const eventEdit = document.getElementById("eventEdit");

    const oldName = row.cells[0].innerText;
    const oldDescription = row.cells[1].innerText;
    const oldImage = row.cells[2].querySelector("img").src;
    const oldUrl = row.cells[3].innerText;

    
    eventEdit.style.display = "block";
    document.getElementById("newName").value = oldName;
    document.getElementById("newDescription").value = oldDescription;
    document.getElementById("currentUrl").value = oldUrl;
    document.getElementById("imageUpload").src = oldImage;

    const imagePreview = document.createElement("img");
    imagePreview.src = oldImage;
    imagePreview.style.maxWidth = "200px";
    const imageContainer = document.getElementById("imagePreviewContainer");
    imageContainer.innerHTML = "";
    imageContainer.appendChild(imagePreview);

    const imageUpload = document.getElementById("imageUpload");
    imageUpload.addEventListener("change", function () {
      const file = imageUpload.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const newImage = e.target.result;
        imagePreview.src = newImage;
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    });

    const saveEditButton = document.getElementById("saveEdit");
    saveEditButton.onclick = function () {
      const newName = document.getElementById("newName").value;
      const newDescription = document.getElementById("newDescription").value;
      const newImage = imagePreview.src;
      const newUrl = document.getElementById("currentUrl").value;

      
      row.cells[0].innerText = newName;
      row.cells[1].innerText = newDescription;
      row.cells[2].querySelector("img").src = newImage;
      row.cells[3].innerText = newUrl;

      
      editEventos(oldName, newName, newDescription, newImage, newUrl);

      
      eventEdit.style.display = "none";
    };

    document.getElementById("close").addEventListener("click", function () {
      eventEdit.style.display = "none";
    });
  }
}
