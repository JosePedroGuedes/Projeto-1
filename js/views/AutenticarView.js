import {
  login,
  add,
  isLogged,
  getUserLogged
} from '../models/UserModels.js';


document.getElementById('switchToRegister').addEventListener('click', function(e) {
  e.preventDefault();
  switchToRegisterForm();
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var email = document.getElementById('loginEmail').value;
  var password = document.getElementById('loginPassword').value;
  var user = findUserByEmailAndPassword(email, password);
  if (user) {
    showMessage('Login successful');
    alert('Logged in successfully!');
  } else {
    showMessage('Invalid email or password');
  }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var username = document.getElementById('registerUsername').value;
  var email = document.getElementById('registerEmail').value;
  var password = document.getElementById('registerPassword').value;
  saveUser({ username: username, email: email, password: password });
  showMessage('Registration successful');
  switchToLoginForm();
});

function showMessage(message) {
  document.getElementById('message').textContent = message;
}

document.getElementById('switchToRegister').addEventListener('click', function(e) {
  e.preventDefault();
  switchToRegisterForm(); // Ensure that this function call is happening
});


function switchToRegisterForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('formTitle').textContent = 'Register';
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('registerLink').style.display = 'none';
}

function switchToLoginForm() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('formTitle').textContent = 'Login';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('registerLink').style.display = 'block';
}
