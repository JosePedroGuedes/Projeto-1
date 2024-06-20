let users = [];

// CARREGAR UTILIZADORES DA LOCALSTORAGE
export function init() {
  if (localStorage.users) {
    const tempUsers = JSON.parse(localStorage.users);
    for (let user of tempUsers) {
      users.push(new User(user.username, user.email, user.password, user.bestTime));
    }
  } else {
    users = [];
  }
}

// ADICIONAR UTILIZADOR
export function add(username, email, password, bestTime = "--:--") {
  try {
    if (users.some((user) => user.username === username || user.email === email)) {
      throw new Error(`User with username "${username}" or email "${email}" already exists!`);
    } else {
      users.push(new User(username, email, password, bestTime));
      localStorage.setItem("users", JSON.stringify(users));
      console.log("User added successfully:", username);
    }
  } catch (error) {
    console.error("Error adding user:", error.message);
    throw error; 
  }
}


// ATUALIZAR UTILIZADOR
export function updateUserData(userId, newUsername, newEmail) {
  const users = JSON.parse(localStorage.getItem("users"));

  //Encontrar o utilizador pelo ID
  const userToUpdate = users.find(user => user.id === userId);

  if (userToUpdate) {

    userToUpdate.username = newUsername;
    userToUpdate.email = newEmail;

    localStorage.setItem("users", JSON.stringify(users));
  } else {
    console.error(`User with ID ${userId} not found.`);
  }
}


// REMOVER UTILIZADOR
export function removeUser(username) {
  try {
    users = users.filter((user) => user.username !== username);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("User removed successfully:", username);
  } catch (error) {
    console.error("Error removing user:", error.message);
    throw error;
  }
}

// LOGIN DO UTILIZADOR
export function login(email, password) {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    sessionStorage.setItem("loggedUser", JSON.stringify(user));
    return true;
  } else {
    throw Error("Invalid login!");
  }
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
  bestTime = "--:--";

  constructor(username, email, password, bestTime) {
    this.id = getNextId();
    this.username = username;
    this.email = email;
    this.password = password;
    this.bestTime = bestTime; 
  }
}
