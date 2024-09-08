document.addEventListener('DOMContentLoaded', function() {
    fetch('../pages/perfil.php')
        .then(response => response.json())
        .then(data => {
            const profileInfo = document.getElementById('profile-info');
            
            // Construir el HTML para los datos del perfil
            profileInfo.innerHTML = `
                <div class="profile-item"><strong>Nombre:</strong> ${data.nombre}</div>
                <div class="profile-item"><strong>Apellido:</strong> ${data.apellido}</div>
                <div class="profile-item"><strong>Nombre de Usuario:</strong> ${data.usuario}</div>
                <div class="profile-item"><strong>Email:</strong> ${data.email}</div>
                <div class="profile-item"><strong>Dirección:</strong> ${data.direccion}</div>
                <div class="profile-item"><strong>Fecha de Nacimiento:</strong> ${data.fecha_nacimiento}</div>
            `;
        })
        .catch(error => console.error('Error al cargar los datos del perfil:', error));
});
