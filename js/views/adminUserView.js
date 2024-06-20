import { init, removeUser, updateUserData} from "../models/UserModels.js";

// ADMIN PAGE USER OPTIONS

document.getElementById("users").style.backgroundColor = "#29445F";
document.getElementById("projects").style.backgroundColor = "";
document.getElementById("alumni").style.backgroundColor = "";

const alumniTable = document.querySelector("#alumniTable");

if (alumniTable) {
  alumniTable.style.display = "none";
  document.getElementById("create-btn").style.display = "block";
}

const projectTable = document.querySelector("#projectTable");
if (projectTable) {
  projectTable.style.display = "none";
  document.getElementById("create-btn").style.display = "block";
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
              <th>Nome do Utilizador</th>
              <th>Email</th>
              <th>Ações</th>
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
                <button class="remove btn btn-danger btn-sm">Remover</button>
            </td>
          `;
    });

    tbody.removeEventListener("click", handleUserActions);
    tbody.addEventListener("click", handleUserActions);
  }
}

//PARA EDITAR E ELEMINAR O UTILIZADOR
function handleUserActions(event) {
  const row = event.target.closest("tr");
  if (!row) return;

  if (event.target.classList.contains("remove")) {
    const username = row.cells[1].innerText;

    
    if (confirm("Tem a certeza que deseja remover este utilizador?")) {
      removeUser(username); 
      row.remove(); 
      alert("User removed");
    }
  }

  if (event.target.classList.contains("edit")) {
    const username = row.cells[1].innerText;
    const email = row.cells[2].innerText;

    const newUsername = prompt("New username", username);
    const newEmail = prompt("New email", email);

    
    if (newUsername && newEmail) {
      row.cells[1].innerText = newUsername;
      row.cells[2].innerText = newEmail;

      const userId = parseInt(row.cells[0].innerText); 
      updateUserData(userId, newUsername, newEmail); 
    }
  }
}
