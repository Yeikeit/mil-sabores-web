document.addEventListener('DOMContentLoaded', () => {
    const form   = document.getElementById('loginForm');     
    const email  = document.getElementById('loginEmail');    
    const pass   = document.getElementById('loginPassword'); 
    const alerts = document.getElementById('alerts');         
    let USERS = [];
  

    fetch('assets/users.json')
      .then(r => r.json())
      .then(data => { USERS = data.users || []; })
      .catch(() => { USERS = []; });
  
    const alertHtml = (type, msg) =>
      `<div class="alert alert-${type}" role="alert">${msg}</div>`;
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alerts.innerHTML = '';
  
      const mail = (email.value || '').trim().toLowerCase();
      const pwd  = pass.value || '';
  
      const user = USERS.find(u =>
        u.email.toLowerCase() === mail && u.password === pwd
      );
  
      if (!user) {
        alerts.innerHTML = alertHtml('warning', 'Correo o contraseña incorrectos');
        return;
      }
  
      alerts.innerHTML =
        alertHtml('success', `Inicio de sesión correcto. ¡Hola, ${user.fullName}!`);


      
      setTimeout(() => location.href = '../index-user.html', 1200);
    });
  });
  