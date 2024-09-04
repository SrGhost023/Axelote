document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("form_register");
    
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevenir el envío del formulario
        const nombreReal = document.getElementById("nombre_real").value;
        const apellidoReal = document.getElementById("apellido_real").value;
        const nombreUsuario = document.getElementById("nombre_de_usuario").value;
        const email = document.getElementById("email").value;
        const direccion = document.getElementById("direccion").value;
        const fechaNacimiento = document.getElementById("fecha_de_nacimiento").value;
        const contrasenia = document.getElementById("contrasenia").value;
        const contraseniaRepetida = document.getElementById("contrasenia_repetida").value;

        // Validaciones adicionales
        if (contrasenia !== contraseniaRepetida) {
            alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
            return;
        }
        // Aquí puedes agregar la lógica para enviar los datos al servidor usando fetch o AJAX
        // Por ejemplo:
        fetch('registrarse.php', {
            method: 'POST',
            body: new URLSearchParams(new FormData(registerForm))
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("¡Registro exitoso! Redirigiendo a la página de inicio...");
                    window.location.href = 'index.html';
                } else {
                    alert("Error en el registro: " + data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    });
});