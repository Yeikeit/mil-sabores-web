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
  



  function validarNombre(nombre) {
    return /^([A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,})$/.test(nombre);
  }

  function validarEmail(email) {
    return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  function validarPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
  }

  function validarTelefono(phone) {
    return /^\+?\d{7,15}$/.test(phone);
  }

  function calcularEdad(fechaNacimiento) {
    const birthdate = new Date(fechaNacimiento);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    if (today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
      age--;
    }
    return isNaN(birthdate.getTime()) ? null : age;
  }

  function mostrarAlertaEspecial(age, email, alertsDiv) {
    if (age > 50) {
      alertsDiv.innerHTML += '<div class="alert alert-info">Tienes un descuento del 10% de por vida con el siguiente código: <b>FELICES50</b></div>';
    }
    if (email.includes("@duoc")) {
      alertsDiv.innerHTML += '<div class="alert alert-info">Correo Duoc: ¡Tortas gratis en tu cumpleaños!</div>';
    }
  }

  function mostrarErrores(errors, alertsDiv) {
    if (errors.length > 0) {
      alertsDiv.innerHTML += '<div class="alert alert-danger">' + errors.join('<br>') + '</div>';
      return true;
    }
    return false;
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const birthdateInput = document.getElementById("birthdate");
    const emailInput = document.getElementById("email");
    const confirmEmailInput = document.getElementById("confirmEmail");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const phoneInput = document.getElementById("phone");
    const alertsDiv = document.getElementById("alerts");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      alertsDiv.innerHTML = "";
      let errors = [];

      const name = document.getElementById("fullName").value.trim();
      if (!validarNombre(name)) {
        errors.push("Nombre debe tener al menos 3 letras y solo caracteres válidos.");
      }

      const email = emailInput.value.trim();
      const confirmEmail = confirmEmailInput.value.trim();
      if (!validarEmail(email)) {
        errors.push("Correo electrónico no es válido.");
      }
      if (email !== confirmEmail) {
        errors.push("Los correos electrónicos no coinciden.");
      }

      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      if (!validarPassword(password)) {
        errors.push("La contraseña debe tener al menos 6 caracteres, incluir letras y números.");
      }
      if (password !== confirmPassword) {
        errors.push("Las contraseñas no coinciden.");
      }

      const phone = phoneInput.value.trim();
      if (phone && !validarTelefono(phone)) {
        errors.push("El teléfono debe tener entre 7 y 15 dígitos, puede incluir '+'.");
      }

      const age = calcularEdad(birthdateInput.value);
      if (age === null) {
        errors.push("Fecha de nacimiento no válida.");
      }

      mostrarAlertaEspecial(age, email, alertsDiv);

      if (mostrarErrores(errors, alertsDiv)) {
        return;
      }

      form.submit();
    });
  });