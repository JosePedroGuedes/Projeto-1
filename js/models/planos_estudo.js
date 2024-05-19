let studies = []


//GUARDAR PLANOS DE ESTUDO NA LOCAL STORAGE
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



//ADICIONAR ESTUDOS
export function add(chairs, credits) {
    if (studies.some((study) => study.chairs === chairs)) {
      throw Error(`Study with this "${chairs}" already exists!`);
    } else {
      users.push(new Study(chairs, credits));
      localStorage.setItem("studies", JSON.stringify(studies));
    }
  
    console.log(studies);
  }
  


class Study {
    chairs = "";
    credits = "";

    constructor (chairs, credits) {
        this.chairs = chairs;
        this.credits = credits;
    }
} 