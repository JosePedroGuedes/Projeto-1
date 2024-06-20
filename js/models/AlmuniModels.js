let alumnis = [];

// GUARDAR ALUMNI NA LOCAL STORAGE
export function loadAlumni() {
  if (localStorage.alumnis) {
    const tempAlumni = JSON.parse(localStorage.getItem("alumnis"));
    for (let alumni of tempAlumni) {
      alumnis.push(new Alumni(alumni.name, alumni.subtitle, alumni.description, alumni.image));
    }
  } else {
    alumnis = [];
  }
}

//ADICIONAR ALUMNI
export function addAlumni(name, subtitle, description, image) {
  let alumni = JSON.parse(localStorage.getItem("alumnis")) || [];
  alumni.push({ name, subtitle, description, image });
  localStorage.setItem("alumnis", JSON.stringify(alumni));
}

//EDITAR ALUMNI
export function editAlumni(oldName, newName, newSubtitle, newDescription, newImage) {
  
  const alumni = JSON.parse(localStorage.getItem("alumnis"));
  
  if (alumni) {
      
      const index = alumni.findIndex(a => a.name === oldName);
      
      if (index !== -1) {
          
          alumni[index].name = newName;
          alumni[index].subtitle = newSubtitle;
          alumni[index].description = newDescription;
          alumni[index].image = newImage;

          
          localStorage.setItem("alumnis", JSON.stringify(alumni));
      } else {
          console.error("Alumni not found");
      }
  } else {
      console.error("Alumni data not found in localStorage");
  }
}

//ELEMINAR ALUMNI
export function removeAlumni(name) {
  const alumni = JSON.parse(localStorage.getItem("alumnis")) || [];
  const updatedAlumni = alumni.filter(alumnis => alumnis.name !== name);
  if (alumni.length === updatedAlumni.length) {
    console.error("Alumni not found:", name);
  } else {
    console.log("Alumni removed:", name);
  }
  localStorage.setItem("alumnis", JSON.stringify(updatedAlumni));
}


class Alumni {
  name = "";
  subtitle = "";
  description = "";
  image = "";

  constructor(name, subtitle, description, image) { 
    this.name = name;
    this.subtitle = subtitle;
    this.description = description;
    this.image = image;
  }
}
