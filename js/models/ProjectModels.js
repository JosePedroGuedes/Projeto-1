let projects = [];

//Guardar os projetos na LocalStorage
export function loadProjects() {
  projects = []; // Ensure projects is reset
  if (localStorage.projects) {
    const tempProjects = JSON.parse(localStorage.projects);
    for (let tempProject of tempProjects) {
      projects.push(new Project(tempProject.name, tempProject.image, tempProject.url));
    }
  } else {
    projects = [];
  }
}

//ADICIONAR PROJETOS
export function addProjects(name, image, url) {
  if (projects.some((project) => project.name === name)) {
    throw Error(`Project with this "${name}" already exist!`);
  } else {
    projects.push(new Project(name, image, url));
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  console.log(projects);
}

//EDITAR PROJETOS
export function editProject(oldName, newName, newImage, newUrl) {
  const project = projects.find(project => project.name === oldName);
  if (project) {
    project.name = newName;
    project.image = newImage;
    project.url = newUrl;
    localStorage.setItem("projects", JSON.stringify(projects));
  }
}

// REMOVER PROJETO
export function removeProject(name) {
  projects = projects.filter(project => project.name !== name);
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
