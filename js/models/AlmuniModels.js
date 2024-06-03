let alumnis = [];

// GUARDAR ALUMNI NA LOCAL STORAGE
export function init() {
  if (localStorage.alumnis) {
    const tempAlumni = JSON.parse(localStorage.alumnis);
    for (let alumni of tempAlumni) {
      alumnis.push(new Alumni(alumni.name, alumni.subtitle, alumni.description, alumni.image));
    }
  } else {
    alumnis = [];
  }
}

//ADICIONAR ALUMNI
export function add(name, subtitle, description, image) {
  if (alumnis.some((alumni) => alumni.name === name)) {
    throw Error(`Alumni with this "${name}" already exist!`);
  } else {
    users.push(new Alumni(name, subtitle, description, image));
    localStorage.setItem("alumni", JSON.stringify(alumnis));
  }

  console.log(alumnis);
}

//ELEMINAR ALUMNI
export function removeProject(name) {
  alumnis = alumnis.filter((alumni) => alumnis.name !== name);
  localStorage.setItem("alumnis", JSON.stringify(alumnis));
}

class Alumni {
  name = "";
  subtitle = "";
  description = "";
  image = "";

  constructor(name, subtitle, description) {
    this.name = name;
    this.subtitle = subtitle;
    this.description = description;
    this.image = image;
  }
}
