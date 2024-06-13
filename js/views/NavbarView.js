import { getUserLogged, init, logout } from "../models/UserModels.js";

// Ensure the user button is hidden initially
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

    // Log the username and its lowercased version for debugging
    console.log("User username:", user.username);
    console.log("Lowercased username:", user.username.toLowerCase());

    // Check if the user is Admin and show Admin Settings option
    if (user.username.toLowerCase() === "admin") {
      document.getElementById("adminSettings").style.display = "block";
    } else {
      console.log("Non-admin user detected");
      document.getElementById("adminSettings").style.display = "none";
    }


    // Logout event listener
    document.getElementById("logout").addEventListener("click", function (event) {
      event.preventDefault();
      logout();
      document.getElementById("userButton").style.display = "none";
      document.getElementById("login").style.display = "block";
    });

    // User button click event listener
    document.getElementById("userButton").addEventListener("click", function () {
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
    });

    // Populate user table
    var tbody = document.querySelector("#userTable tbody");
    if (tbody) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.forEach(function (user) {
        var row = tbody.insertRow();
        row.innerHTML = `<td>${user.username}</td>`;
      });
    }

    // Handle Edit Profile Popup
    const editProfilePopup = document.getElementById("editProfilePopup");
    const editProfileForm = document.getElementById("editProfileForm");
    const closeEditProfilePopup = document.getElementById(
      "closeEditProfilePopup"
    );

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

    window.addEventListener("click", function (event) {
      if (event.target === editProfilePopup) {
        editProfilePopup.style.display = "none";
      }
    });


    // Edit Profile Form Submission Handler
    editProfileForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const users = JSON.parse(localStorage.getItem("users")) || []; // Retrieve users from localStorage
      const username = document.getElementById("editUsername").value;
      const email = document.getElementById("editEmail").value;
      const password = document.getElementById("editPassword").value;

      // Find the index of the logged-in user in the users array
      const loggedInUserIndex = users.findIndex(
        (users) => users.username === getUserLogged.username
      );
      

      if (loggedInUserIndex !== -1) {
        // Verificar se o utilizador existe
        users[loggedInUserIndex].username = username;
        users[loggedInUserIndex].email = email;
        users[loggedInUserIndex].password = password;

        localStorage.setItem("users", JSON.stringify(users));

        getUserLogged.username = username;
        getUserLogged.email = email;
        getUserLogged.password = password;

        editProfilePopup.style.display = "none";
        alert("Profile updated successfully!");
      } else {
        alert("User not found!");
      }
    });
  }
}); 
