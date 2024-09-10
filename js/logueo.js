
// Verificar si el usuario ha iniciado sesión

document.addEventListener('DOMContentLoaded', function () {
    // Función para verificar si una cookie existe
    function getCookie(name) {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(name + '=') === 0) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }
    // Verificar si el usuario ha iniciado sesión (cookie)
    let isLoggedIn = getCookie('loggedIn');

    if (isLoggedIn === 'true') {
        // Mostrar la imagen de perfil y esconder los botones de inicio de sesión y registro
        document.getElementById('iniciar_sesion').style.display = 'none';
        document.getElementById('registrarse').style.display = 'none';
        document.getElementById('perfil').style.display = 'block';
        document.getElementById('cerrar_sesion').style.display = 'block'; // Mostrar opción de cerrar sesión en el menú hamburguesa
    } else {
        // Ocultar la imagen de perfil y el botón de "Cerrar Sesión" si no está logueado
        document.getElementById('perfil').style.display = 'none';
        document.getElementById('cerrar_sesion').style.display = 'none';
        document.getElementById('iniciar_sesion').style.display = 'block';
        document.getElementById('registrarse').style.display = 'block';
    }
});
// Función para cerrar sesión
function cerrarSesion() {
    // Borrar la cookie de sesión
    document.cookie = 'loggedIn=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    
    // Redireccionar a la página de inicio de sesión
    window.location.href = 'iniciarSesion.html'; // O usa 'index.html' si prefieres redirigir al inicio
}
// Añadir el evento de clic para cerrar sesión
document.getElementById('cerrar_sesion')?.addEventListener('click', cerrarSesion);