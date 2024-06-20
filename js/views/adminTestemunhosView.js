import {loadAlumni, addAlumni, removeAlumni, editAlumni} from "../models/AlmuniModels.js";

// ADMIN PAGE ALUMNI OPTIONS

document.getElementById("alumni").style.backgroundColor = "#29445F";
document.getElementById("users").style.backgroundColor = "";
document.getElementById("projects").style.backgroundColor = "";

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


const alumniTable = document.getElementById("alumniTable");
if (alumniTable) {
  alumniTable.style.display = "block";
  document.getElementById("create-btn").style.display = "block";
}




document.getElementById("create-btn").onclick = function () {
  document.getElementById("createAlumni").style.display = "block";


  const oldImage = document.getElementById("imageUploadCreateAlumni").src;

  //Preview da imagem selecionada
  const imagePreview = document.createElement("img");
  imagePreview.src = oldImage;
  imagePreview.style.maxWidth = "200px";
  const imageContainer = document.getElementById(
    "imagePreviewContainerCreateAlumni"
  );
  imageContainer.innerHTML = "";
  imageContainer.appendChild(imagePreview);

  const imageUpload = document.getElementById("imageUploadCreateAlumni");
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

  const createAlumniButton = document.getElementById("createAlumniBtn");
  
  createAlumniButton.addEventListener("click", function () {
    const newName = document.getElementById("nameAlumni").value;
    const newSubtitle = document.getElementById("subtitle").value;
    const newDescription = document.getElementById("description").value;
    const newImage = imagePreview.src;
    
    if (newName && newSubtitle && newDescription && newImage) {
      addAlumni(newName, newSubtitle, newDescription, newImage);
      alert("Alumni adicionado com sucesso!");
      loadAlumni();
      renderAlumni();
      
      document.getElementById("createAlumni").style.display = "none";
      window.location.reload();
    }
  });
  document.getElementById("close-alumni").addEventListener("click", function () {
    createAlumni.style.display = "none";
  });
};

loadAlumni();
renderAlumni();

//Função que fará com que atualize a tabela em tempo real
function renderAlumni() {
  const alumni = JSON.parse(localStorage.getItem("alumnis"));
  if (alumni && alumniTable) {
    const tbody = alumniTable.querySelector("tbody");
    const thead = alumniTable.querySelector("thead");

    if (thead) {
      thead.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Subtítulo</th>
                <th>Descrição</th>
                <th>Imagem</th>
                <th>Ações</th>
            </tr>
          `;
    }

    if (tbody) {
      tbody.innerHTML = "";
      alumni.forEach(function (alumni) {
        const row = tbody.insertRow();
        row.innerHTML = `
              <td>${alumni.name}</td>
              <td>${alumni.subtitle}</td>
              <td class="description-cell">${alumni.description}</td>
              <td><img src="${alumni.image}" alt="${alumni.name}" width="30%"></td>
              <td>
                  <button class="btn btn-info btn-sm edit">Editar</button>
                  <button class="btn btn-danger btn-sm remove">Remover</button>
              </td>
            `;
      });

      tbody.removeEventListener("click", handleAlumniActions);
      tbody.addEventListener("click", handleAlumniActions);
    }
  } else {
    console.error("Alumni não encontrado no localStorage ou alumniTable não encontrado");
  }
}

function handleAlumniActions(event) {
  const row = event.target.closest("tr");
  if (!row) return;

  if (event.target.classList.contains("remove")) {
    const name = row.cells[0].innerText;

    if (confirm("Tem a certeza que deseja remover este alumni?")) {
      removeAlumni(name);
      row.remove();
      alert("Alumni removido com sucesso!");
      document.getElementById("editModal").style.display = "none";
    } else {
      document.getElementById("editModal").style.display = "none";
    }
  }

  if (event.target.classList.contains("edit")) {
    const alumniEdit = document.getElementById("editModal");
    

    const oldName = row.cells[0].innerText;
    const oldSubtitle = row.cells[1].innerText;
    const oldDescription = row.cells[2].innerText;
    const oldImage = row.cells[3].querySelector("img").src;
    alumniEdit.style.display = "block";

    document.getElementById("updateName").value = oldName;
    document.getElementById("newSubtitle").value = oldSubtitle;
    document.getElementById("newDescription").value = oldDescription;

    const imagePreview = document.createElement("img");
    imagePreview.src = oldImage;
    imagePreview.style.maxWidth = "200px";
    const imageContainer = document.getElementById(
      "imagePreviewContainerAlumni"
    );
    imageContainer.innerHTML = "";
    imageContainer.appendChild(imagePreview);

    const imageUpload = document.getElementById("imageUploadEditAlumni");
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

    const saveEditButton = document.getElementById("saveEditAlumni");
    saveEditButton.onclick = function () {
      const newName = document.getElementById("updateName").value;
      const newSubtitle = document.getElementById("newSubtitle").value;
      const newDescription = document.getElementById("newDescription").value;
      const newImage = imagePreview.src;

      if (newName && newSubtitle && newDescription && newImage) {
        row.cells[0].innerText = newName;
        row.cells[1].innerText = newSubtitle;
        row.cells[2].innerText = newDescription;
        row.cells[3].querySelector("img").src = newImage;
      }
      alumniEdit.style.display = "none";
      editAlumni(oldName, newName, newSubtitle, newDescription, newImage);
    };

    document.getElementById("close").addEventListener("click", function () {
      alumniEdit.style.display = "none";
    });
  }
}
