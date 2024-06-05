import { add, login } from "../models/UserModels";

document
  .getElementById("switchToRegister")
  .addEventListener("click", function (e) {
    e.preventDefault();
    switchToRegisterForm();
  });

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;
  try {
    if (login(email, password)) {
      showMessage("Login successful");
      alert("Logged in successfully!");
    }
  } catch (error) {
    showMessage("Invalid email or password");
  }
});

document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    var username = document.getElementById("registerUsername").value;
    var email = document.getElementById("registerEmail").value;
    var password = document.getElementById("registerPassword").value;

    try {
      add(username, email, password);
      showMessage("Registration successful");
      switchToLoginForm();
    } catch (error) {
      showMessage("Email already registered");
    }
  });

function showMessage(message) {
  document.getElementById("message").textContent = message;
}

document
  .getElementById("switchToLoginForm")
  .addEventListener("click", function (e) {
    e.preventDefault();
    switchToLoginForm();
  });

function switchToRegisterForm() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("formTitle").textContent = "Register";
  document.getElementById("registerForm").style.display = "block";
}

function switchToLoginForm() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("formTitle").textContent = "Login";
  document.getElementById("registerForm").style.display = "none";
}
