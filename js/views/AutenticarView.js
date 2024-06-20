import {init, add, login,} from "../models/UserModels.js";

// Mudar para o formulário de registo
document.getElementById("switchToRegister").addEventListener("click", function (e) {
    e.preventDefault();
    switchToRegisterForm();
  });

// Mudar para o formulário de login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;
  try {
    init();
    if (login(email, password)) {
      showMessage("Login successful");
      window.location.href = "http://127.0.0.1:5501/index.html";
    }
  } catch (error) {
    showMessage("Invalido email ou palavra-passe!");
  }
});

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var username = document.getElementById("registerUsername").value;
    var email = document.getElementById("registerEmail").value;
    var password = document.getElementById("registerPassword").value;

    try {
      init();
      add(username, email, password);
      showMessage("Conta criada com sucesso!");
      switchToLoginForm();
    } catch (error) {
      showMessage("Esta conta já existe!");
      console.log(error);
    }
  });

function showMessage(message) {
  document.getElementById("message").textContent = message;
}

document.getElementById("switchToLoginForm").addEventListener("click", function (e) {
    e.preventDefault();
    switchToLoginForm();
  });

function switchToRegisterForm() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("formTitle").textContent = "Criar Conta";
  document.getElementById("registerForm").style.display = "block";
}

function switchToLoginForm() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("formTitle").textContent = "Iniciar Sessão";
  document.getElementById("registerForm").style.display = "none";
}

