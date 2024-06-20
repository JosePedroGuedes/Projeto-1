import { getUserLogged, init, logout } from "../models/UserModels.js";

document.getElementById("userButton").style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
  init();
  

  const user = getUserLogged();

  if (user) {
    document.getElementById("login").style.display = "none";
    const userButton = document.getElementById("userButton");
    const userNameSpan = document.getElementById("userName");
    userNameSpan.textContent = user.username;
    userButton.style.display = "block";

   
    if (user.username.toLowerCase() === "admin") {
      document.getElementById("adminSettings").style.display = "block";
    } else {
      document.getElementById("adminSettings").style.display = "none";
    }

    
    document.getElementById("logout").addEventListener("click", function (event) {
        event.preventDefault();
        logout();
        document.getElementById("userButton").style.display = "none";
        document.getElementById("login").style.display = "block";
      });

    
    document.getElementById("userButton").addEventListener("click", function () {

        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
      });

    
    var tbody = document.querySelector("#userTable tbody");
    if (tbody) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.forEach(function (user) {
        var row = tbody.insertRow();
        row.innerHTML = `<td>${user.username}</td>`;
      });
    }

    
    const editProfilePopup = document.getElementById("editProfilePopup");
    const editProfileForm = document.getElementById("editProfileForm");
    const closeEditProfilePopup = document.getElementById("closeEditProfilePopup");

    document.querySelector(".popup-item[href*='settings.html']").addEventListener("click", function (event) {
        event.preventDefault();
        const user = getUserLogged();
        if (user) {
          document.getElementById("editUsername").value = user.username;
          document.getElementById("editEmail").value = user.email;
          document.getElementById("editPassword").value = user.password;
          editProfilePopup.style.display = "block";
        }
      });

    closeEditProfilePopup.addEventListener("click", function () {
      editProfilePopup.style.display = "none";
    });

   

    

    // Edit Profile Form 
    editProfileForm.addEventListener("submit", function (event) {
      event.preventDefault();
      
  

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const username = document.getElementById("editUsername").value;
      const email = document.getElementById("editEmail").value;
      const password = document.getElementById("editPassword").value;
    
      const updatedUser = getUserLogged();
      const editUser = users.find((u) => u.username === updatedUser.username);
    
      if (editUser) {
        editUser.username = username;
        editUser.email = email;
        editUser.password = password;
    
        // Atualiza a local storage
        localStorage.setItem("users", JSON.stringify(users));
    
        // Atualiza a session storage quando o utilizador edita as informações
        const loggedUser = sessionStorage.getItem("loggedUser");
        if (loggedUser) {
          const loggedUserData = JSON.parse(loggedUser);
          loggedUserData.username = username;
          loggedUserData.email = email;
          loggedUserData.password = password;
          sessionStorage.setItem("loggedUser", JSON.stringify(loggedUserData));
        }
    
        document.getElementById("userName").textContent = username;
    
        confirm("Utilizador alterado com sucesso!");
        window.location.reload();
      } else {
        alert("Utilizador não encontrado.");
      }
    });
  }
}); 
