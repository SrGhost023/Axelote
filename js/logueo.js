
// Verificar si el usuario ha iniciado sesión
document.addEventListener('DOMContentLoaded', function () {
    // Usar localStorage, sessionStorage o una cookie para verificar el estado de sesión
    let isLoggedIn = sessionStorage.getItem('loggedIn'); // Usando sessionStorage

    console.log(isLoggedIn);
    if (isLoggedIn === 'true') {
        // Mostrar la imagen de perfil y esconder los botones de inicio de sesión y registro
        document.getElementById('iniciar_sesion').style.display = 'none';
        document.getElementById('registrarse').style.display = 'none';
        document.getElementById('perfil').style.display = 'block';
    } else {
        // Ocultar la imagen de perfil si no está logueado
        document.getElementById('perfil').style.display = 'none';
    }
});

// Función para iniciar sesión
function iniciarSesion(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    
    // Guardar el estado de la sesión
    sessionStorage.setItem('loggedIn', 'true');
    console.log(sessionStorage.getItem('loggedIn'));
    
    // Redireccionar al index después del inicio de sesión
    window.location.href = 'index.html';
}

// Función para cerrar sesión
function cerrarSesion() {
    // Eliminar el estado de la sesión
    sessionStorage.removeItem('loggedIn');
    
    // Ocultar el botón de "Cerrar Sesión" después de cerrar sesión
    document.getElementById('cerrar_sesion').style.display = 'none';

    // Redireccionar a la página de inicio de sesión o a la página de inicio
    window.location.href = 'iniciarSesion.html'; // O usa 'index.html' si prefieres redirigir al inicio
}
