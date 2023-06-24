document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Validar el usuario y contraseña ingresados
      if (username === 'admin' && password === 'password') {
        // Iniciar sesión exitosa
        window.location.href = 'nuevos_productos.html';
      } else {
        // Credenciales inválidas
        alert('Usuario o contraseña incorrectos. Inténtalo nuevamente.');
        // Limpiar los campos de usuario y contraseña
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
      }
    });
  });
  