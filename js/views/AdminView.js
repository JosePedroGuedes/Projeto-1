import { init, removeUser } from "../models/UserModels.js";
import { loadAlumni, addAlumni, removeAlumni, editAlumni } from "../models/AlmuniModels.js";

// ADMIN PAGE USER OPTIONS
function switchToUsers() {

  document.getElementById("users").style.backgroundColor="#29445F"
  document.getElementById("alumni").style.backgroundColor=""

  const alumniTable = document.querySelector("#alumniTable");
  if (alumniTable) {
    alumniTable.style.display = "none";
    document.getElementById("create-btn").style.display = "none";
  } else {
    console.error("User table not found");
  }

  const userTable = document.querySelector("#userTable");
  if (userTable) {
    userTable.style.display = "";
  }

  init();

  const users = JSON.parse(localStorage.getItem("users"));
  if (users && userTable) {
    const tbody = userTable.querySelector("tbody");
    const thead = userTable.querySelector("thead");

    if (thead) {
      thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
      `;
    }

    if (tbody) {
      tbody.innerHTML = "";
      users.forEach(function (user) {
        const row = tbody.insertRow();
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>
              <button class="edit btn btn-info btn-sm">Editar</button>
              <button class="remove btn btn-danger btn-sm">Delete</button>
          </td>
        `;
      });

      tbody.removeEventListener("click", handleUserActions);
      tbody.addEventListener("click", handleUserActions);
    }
  }
}
//PARA EDITAR E ELEMINAR O UTILIZADOR
function handleUserActions(event) {
  const row = event.target.closest("tr");
  if (!row) return;

  if (event.target.classList.contains("remove")) {
    const username = row.cells[1].innerText;

    // Confirm to delete the user
    if (confirm("Are you sure you want to delete this user?")) {
      removeUser(username);
      row.remove();
      alert("User removed");
    }
  }

  if (event.target.classList.contains("edit")) {
    const username = row.cells[1].innerText;
    const email = row.cells[2].innerText;

    // Get the email and username
    const newUsername = prompt("New username", username);
    const newEmail = prompt("New email", email);

    // Update the username and email
    if (newUsername && newEmail) {
      row.cells[1].innerText = newUsername;
      row.cells[2].innerText = newEmail;
    }
  }
}

document.addEventListener("DOMContentLoaded", switchToUsers);







// ADMIN PAGE ALUMNI OPTIONS
function switchToAlumni() {

  document.getElementById("alumni").style.backgroundColor="#29445F"
  document.getElementById("users").style.backgroundColor=""
  
  const userTable = document.querySelector("#userTable");

  if (userTable) {
    userTable.style.display = "none";
    document.getElementById("create-btn").style.display = "block";
  } else {
    console.error("User table not found");
  }

  const alumniTable = document.getElementById("alumniTable");
  if (alumniTable) {
    alumniTable.style.display = "block";
  } else {
    console.error("Alumni table not found");
  }

  document.getElementById("create-btn").addEventListener("click", function () {
    const name = prompt("Name");
    const subtitle = prompt("Subtitle");
    const description = prompt("Description");
    const image = prompt("Image");

    if (name && subtitle && description && image) {
      addAlumni(name, subtitle, description, image);
      alert("Alumni added");
      loadAlumni();
    }
  });

  loadAlumni();

  const alumni = JSON.parse(localStorage.getItem("alumnis"));
  if (alumni && alumniTable) {
    const tbody = alumniTable.querySelector("tbody");
    const thead = alumniTable.querySelector("thead");

    if (thead) {
      thead.innerHTML = `
          <tr>
              <th>Name</th>
              <th>Subtitle</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
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
            <td><img src="${alumni.image}" alt="${alumni.name}" width="60%"></td>
            <td>
                <button class="edit btn btn-info btn-sm">Edit</button>
                <button class="remove btn btn-danger btn-sm">Delete</button>
            </td>
          `;
      });

      tbody.removeEventListener("click", handleAlumniActions);
      tbody.addEventListener("click", handleAlumniActions);
    }
  } else {
    console.error("Alumni not found in localStorage or alumniTable not found");
  }
}

function handleAlumniActions(event) {
  const row = event.target.closest("tr");
  if (!row) return;

  if (event.target.classList.contains("remove")) {
    const name = row.cells[0].innerText;

    // Confirm to delete the alumni
    if (confirm("Are you sure you want to delete this alumni?")) {
      removeAlumni(name);
      row.remove();
      alert("Alumni removed");
    }
  }

  if (event.target.classList.contains("edit")) {
    const name = row.cells[0].innerText;
    const subtitle = row.cells[1].innerText;
    const description = row.cells[2].innerText;
    const image = row.cells[3].querySelector("img").src;

    const newName = prompt("New name", name);
    const newSubtitle = prompt("New subtitle", subtitle);
    const newDescription = prompt("New description", description);
    const newImage = prompt("New image URL", image);

    if (newName && newSubtitle && newDescription && newImage) {
      row.cells[0].innerText = newName;
      row.cells[1].innerText = newSubtitle;
      row.cells[2].innerText = newDescription;
      row.cells[3].querySelector("img").src = newImage;

      // DAR UPDATE NA LOCAL STORAGE
      editAlumni(name, newName, newSubtitle, newDescription, newImage);

      alert("Alumni updated");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#users").addEventListener("click", switchToUsers);
  document.querySelector("#alumni").addEventListener("click", switchToAlumni);
});

/*
//Admin Page Projects
function switchToProjects() {
    loadProjects();
    var projects = JSON.parse(localStorage.getItem('projects'));
    var tbody = document.querySelector("#projectTable tbody");

    projects.forEach(function(project) {
        var row = tbody.insertRow();
        row.innerHTML = `
            <td>${project.image}</td>
            <td>${project.name}</td>
            <td>${project.url}</td>
            <td>
                <button class="btn btn-info btn-sm">Editar</button>
                <button class="btn btn-danger btn-sm">Apagar</button>
            </td>
        `;
    });

    // Remove o Projeto
    tbody.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove")) {
            const row = event.target.closest("tr");
            const name = row.cells[1].innerText;

            // Confirmar para apagar o projeto
            if (confirm("Tem a certeza que deseja apagar este projeto?")) {
                removeProject(name);
                row.remove();
                alert("Project removed");
            }
        }
    });

    // Editar Projeto
    tbody.addEventListener("click", function(event) {
        if (event.target.classList.contains("edit")) {
            const row = event.target.closest("tr");
            const name = row.cells[1].innerText;
            const url = row.cells[2].innerText;

            // Obter o nome e o url
            const newName = prompt("New name", name);
            const newUrl = prompt("New url", url);

            // Atualizar o nome e o url
            if (newName && newUrl) {
                row.cells[1].innerText = newName;
                row.cells[2].innerText = newUrl;
            }
        }
    });

}

document.addEventListener("DOMContentLoaded", switchToProjects); 
*/
