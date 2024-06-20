import {loadProjects, addProjects, removeProject, editProject,} from "../models/ProjectModels.js";


// Admin Page Projects

document.getElementById("alumni").style.backgroundColor = "";
document.getElementById("users").style.backgroundColor = "";
document.getElementById("projects").style.backgroundColor = "#29445F";

const userTable = document.querySelector("#userTable");
const projectTable = document.querySelector("#projectTable");
const alumniTable = document.getElementById("alumniTable");

if (userTable) {
  document.getElementById("create-btn").style.display = "block";
  userTable.style.display = "none";
}

if (alumniTable) {
  alumniTable.style.display = "block";
  document.getElementById("create-btn").style.display = "block";
}

if (projectTable) {
  document.getElementById("create-btn").style.display = "block";
  projectTable.style.display = "block";
}

//Criar novo projeto
document.getElementById("create-btn").onclick = function () {
  document.getElementById("createProject").style.display = "block";

  const oldImage = document.getElementById("imageUpload").src;

  const imagePreview = document.createElement("img");
  imagePreview.src = oldImage;
  imagePreview.style.maxWidth = "200px";
  const imageContainer = document.getElementById(
    "imagePreviewContainerProject"
  );
  imageContainer.innerHTML = ""; 
  imageContainer.appendChild(imagePreview);

  
  // Handle the image file selection
  const imageUpload = document.getElementById("imageUploadCreateProject");
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



  const createProjectButton = document.getElementById("createProjectbtn");
  createProjectButton.addEventListener("click", function () {
    const newName = document.getElementById("name").value;
    const newImage = imagePreview.src;
    const newUrl = document.getElementById("url").value;

    if (newName && newImage && newUrl) {
      addProjects(newName, newImage, newUrl);
      alert("Project added");
      loadProjects();
      renderProjects();
      document.getElementById("createProject").style.display = "none";

      
    }
  });
  //Fechar pop up
  document.getElementById("close-create").addEventListener("click", function () {
    createProject.style.display = "none";
  });

};

loadProjects();
renderProjects();

function renderProjects() {
  const projectTable = document.getElementById("projectTable");
  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  if (projectTable) {
    const tbody = projectTable.querySelector("tbody");
    const thead = projectTable.querySelector("thead");

    if (thead) {
      thead.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Imagem</th>
                <th>URL</th>
                <th>Ações</th>
            </tr>
          `;
    }

    if (tbody) {
      tbody.innerHTML = "";
      projects.forEach((project) => {
        const row = tbody.insertRow();
        row.innerHTML = `
              <td>${project.name}</td>
              <td><img src="${project.image}" alt="${project.name}" width="10%"></td>
              <td><a href="${project.url}" target="_blank">${project.url}</a></td>
              <td>
                  <button class="edit btn btn-info btn-sm">Editar</button>
                  <button class="remove btn btn-danger btn-sm">Remover</button>
              </td>
            `;
      });

      tbody.removeEventListener("click", handleProjectActions);
      tbody.addEventListener("click", handleProjectActions);
    }
  } else {
    console.error("Project table not found");
  }
}

function handleProjectActions(event) {
  const row = event.target.closest("tr");
  if (!row) return;

  if (event.target.classList.contains("remove")) {
    const name = row.cells[0].innerText;

    if (confirm("Tem a certeza que deseja remover este projeto?")) {
      removeProject(name);
      row.remove();
      alert("Projeto removido com sucesso!");
      document.getElementById("projectEdit").style.display = "none";
    }
  } else if (event.target.classList.contains("edit")) {
    const projectEdit = document.getElementById("projectEdit");
    const oldName = row.cells[0].innerText;
    const oldImage = row.cells[1].querySelector("img").src;
    const oldURL = row.cells[2].querySelector("a").href;
    
    projectEdit.style.display = "block";

    
    document.getElementById("currentUrl").value = oldURL;
    document.getElementById("newName").value = oldName;

    // Mostrar a imagem selecionada no pop up
    const imagePreview = document.createElement("img");
    imagePreview.src = oldImage;
    imagePreview.style.maxWidth = "200px"; // Ajustar imagem
    const imageContainer = document.getElementById("imagePreviewContainer");
    imageContainer.innerHTML = ""; // Apagar imagem anterior
    imageContainer.appendChild(imagePreview);

  
    const imageUpload = document.getElementById("imageUpload");
    imageUpload.addEventListener("change", function () {
      const file = imageUpload.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const newImage = e.target.result;
        // Mostrar imagem selecionada no modal
        imagePreview.src = newImage;
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    });

    const saveEditButton = document.getElementById("saveEdit");
    saveEditButton.addEventListener("click", function () {
      const newName = document.getElementById("newName").value;
      const newImage = imagePreview.src;
      const newURL = document.getElementById("currentUrl").value;

      if (newName && newImage) {
        row.cells[0].innerText = newName;
        row.cells[1].querySelector("img").src = newImage;
        row.cells[2].querySelector("a").href = newURL;

        projectEdit.style.display = "none";
        editProject(oldName, newName, newImage, newURL);
        renderProjects();
      }
    });

    //Fechar pop up
    document.getElementById("close").addEventListener("click", function () {
      projectEdit.style.display = "none";
    });

  }
}

