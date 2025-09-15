function initRegionesFrom(urlJson) {
    const regionSel = document.getElementById('region');
    const comunaSel = document.getElementById('comuna');
  
    comunaSel.disabled = true; 
  
    fetch(urlJson)
      .then(r => r.json())
      .then(data => {
        const regiones = (data && data.regiones) || [];
  
        regiones.forEach(r => regionSel.options.add(new Option(r.region, r.region)));
  
        regionSel.onchange = function () {
          const reg = regiones.find(x => x.region === this.value);
          comunaSel.length = 1;                   
          (reg ? reg.comunas : []).forEach(c => comunaSel.options.add(new Option(c, c)));
          comunaSel.disabled = !reg;
        };
      })
      .catch(err => console.error('No se pudo cargar regiones:', err));
  }
  

  // Apartado de alertas
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const birthdateInput = document.getElementById("birthdate");
    const emailInput = document.getElementById("email");

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Detenemos el envío para realizar las validaciones

      const birthdate = new Date(birthdateInput.value);
      const today = new Date();
      let age = today.getFullYear() - birthdate.getFullYear();
      if (today.getMonth() < birthdate.getMonth() || 
          (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
        age--;
      }

      if (age > 50) alert("Tienes un descuento del 10% de por vida con el siguiente codigo: FELICES50");
      if (emailInput.value.includes("@duoc")) alert("Correo Duoc: ¡Tortas gratis en tu cumpleaños!");

      form.submit();
    });
  });