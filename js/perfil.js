
// Función para cargar los datos del perfil del usuario
document.addEventListener('DOMContentLoaded', function () {
    fetch('../pages/getPerfil.php') // Archivo PHP que devuelve los datos del usuario
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const user = data.user;
                const infoUsuarioDiv = document.getElementById('info-usuario');
                infoUsuarioDiv.innerHTML = `
                    <p><strong>Nombre:</strong> ${user.nombre_real}</p>
                    <p><strong>Apellido:</strong> ${user.apellido_real}</p>
                    <p><strong>Nombre de Usuario:</strong> ${user.nombre_de_usuario}</p>
                    <p><strong>Correo Electrónico:</strong> ${user.email}</p>
                    <p><strong>Dirección:</strong> ${user.direccion}</p>
                    <p><strong>Fecha de Nacimiento:</strong> ${user.fecha_de_nacimiento}</p>
                `;
            } else {
                document.getElementById('info-usuario').innerHTML = '<p>No se pudieron cargar los datos del usuario.</p>';
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos del perfil:', error);
            document.getElementById('info-usuario').innerHTML = '<p>Hubo un error al cargar los datos del usuario.</p>';
        });
});
