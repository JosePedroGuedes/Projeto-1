let alumnis = [];

// GUARDAR ALUMNI NA LOCAL STORAGE
export function init() {
  if (localStorage.alumnis) {
    const tempAlumni = JSON.parse(localStorage.alumnis);
    for (let alumni of tempAlumni) {
      alumnis.push(
        new Alumni(alumni.name, alumni.subtitle, alumni.description)
      );
    }
  } else {
    alumnis = [];
  }
}

//ADICIONAR ALUMNI
export function add(name, subtitle, description) {
  if (alumnis.some((alumni) => alumni.name === name)) {
    throw Error(`Alumni with this "${name}" already exist!`);
  } else {
    users.push(new Alumni(name, subtitle, description));
    localStorage.setItem("alumni", JSON.stringify(alumnis));
  }

  console.log(alumnis);
}

//ELEMINAR ALUMNI

class Alumni {
  name = "";
  subtitle = "";
  description = "";

  constructor(name, subtitle, description) {
    this.name = name;
    this.subtitle = subtitle;
    this.description = description;
  }
}
  