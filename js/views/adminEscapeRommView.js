import { init } from "../models/UserModels.js";

// ADMIN PAGE USER OPTIONS
document.getElementById("users").style.backgroundColor = "";
document.getElementById("projects").style.backgroundColor = "";
document.getElementById("alumni").style.backgroundColor = "";
document.getElementById("escape-room").style.backgroundColor = "#29445F";

init();


const userTable = document.getElementById("escaperoomTable");


userTable.style.display = "table";


const users = JSON.parse(localStorage.getItem("users"));
if (users && userTable) {
  const tbody = userTable.querySelector("tbody");
  const thead = userTable.querySelector("thead");

  
  if (thead) {
    thead.innerHTML = `
      <tr>
        <th>Nome do Utilizador</th>
        <th>Melhor Tempo</th>
        <th>Ações</th>
      </tr>
    `;
  }

 
  if (tbody) {
    tbody.innerHTML = "";
    users.forEach(function (user) {
      const row = tbody.insertRow();
      row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.bestTime}</td>
      `;
    });

    
    tbody.removeEventListener("click", handleUserActions);
    tbody.addEventListener("click", handleUserActions);
  }
}




