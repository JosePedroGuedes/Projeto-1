let users = [];

//Guardar os utilizadores na LocalStorage
export function init() {
  if (localStorage.users) {
    const tempUsers = JSON.parse(localStorage.users);
    for (let user of tempUsers) {
      user.push(new User(user.username, user.password));
    }
  } else {
    users = [];
  }
}

//Adicionar utilizador
export function add(username, password) {
  if (users.some((user) => user.name === username)) {
    throw Error(`User with this "${username}" already exist!`);
  } else {
    users.push(new User(username, password));
    localStorage.setItem("users", JSON.stringify(users));
  }

  console.log(users);
}


// LOGOUT DO UTILIZADOR
export function logout() {
  sessionStorage.removeItem("loggedUser");
}

// VERIFICA EXISTÊNCIA DE ALGUÉM AUTENTICADO
export function isLogged() {
  return sessionStorage.getItem("loggedUser") ? true : false;
}

// DEVOLVE UTILZIADOR AUTENTICADO
export function getUserLogged() {
  return JSON.parse(sessionStorage.getItem("loggedUser"));
}

export function findUser(userId) {
  console.log(users, userId);
  return users.find((user) => user.id == userId);
}

function getNextId() {
  return users.length > 0 ? users.length + 1 : 1;
}


class User {
  id = null;
  username = "";
  email = "";
  password = "";

  constructor(username, email, password) {
    this.id = getNextId();
    this.username = username;
    this.email = email;
    this.password = password;
  }
}