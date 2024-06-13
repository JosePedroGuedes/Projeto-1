let projects = [];

//Guardar os projetos na LocalStorage
export function loadProjects() {
  if (localStorage.projects) {
    const tempProjects = JSON.parse(localStorage.projects);
    for (let project of tempProjects) {
      project.push(new Project(project.name, project.image, project.url));
    }
  } else {
    projects = [];
  }
}

//Adicionar projetos
export function addProjects(name, image, url) {
  if (projects.some((project) => project.name === name)) {
    throw Error(`Project with this "${name}" already exist!`);
  } else {
    users.push(new Project(name, image, url));
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  console.log(projects);
}

// REMOVER PROJETO
export function removeProject(name) {
  projects = projects.filter((project) => projects.name !== name);
  localStorage.setItem("projects", JSON.stringify(projects));
}

class Project {
  name = "";
  image = "";
  url = "";

  constructor(name, image, url) {
    this.name = name;
    this.image = image;
    this.url = url;
  }
}
