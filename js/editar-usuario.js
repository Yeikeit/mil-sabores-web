document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('editUserForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const birthdateInput = document.getElementById('birthdate');
  const regionInput = document.getElementById('region');
  const comunaInput = document.getElementById('comuna');

  function cargarInformacionUsuario() {
    fetch('../assets/users.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo cargar la información del usuario.');
        }
        return response.json();
      })
      .then((data) => {
        const usuarioActual = data.users.find((user) => user.id === 1);

        if (usuarioActual) {
          fullNameInput.value = usuarioActual.fullName || '';
          emailInput.value = usuarioActual.email || '';
          birthdateInput.value = usuarioActual.birthdate || '';
          regionInput.value = usuarioActual.region || '';
          comunaInput.value = usuarioActual.comuna || '';
        } else {
          alert('No se encontró información del usuario.');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Hubo un error al cargar la información del usuario.');
      });
  }


  cargarInformacionUsuario();
});