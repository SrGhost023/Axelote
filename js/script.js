document.getElementById('toggleButton').addEventListener('click', function() {
    const loginForm = document.getElementById('loginForm');
    const formTitle = document.getElementById('formTitle');
    const submitButton = document.getElementById('submitButton');
    const toggleText = document.getElementById('toggleText');
    const isRegistering = formTitle.textContent === 'Iniciar Sesión';

    if (isRegistering) {
        formTitle.textContent = 'Registrarse';
        submitButton.textContent = 'Registrarse';
        loginForm.innerHTML = `
            <div class="form-group">
                <label for="username">Nombre de usuario</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group" id="confirmPasswordContainer" style="display: none;">
                <label for="confirmPassword">Confirmar contraseña</label>
                <input type="password" id="confirmPassword" name="confirmPassword">
            </div>
            <div class="form-group">
                <label for="email">Correo electrónico</label>
                <input type="email" id="email" name="email" required>
            </div>
            <button type="submit" id="submitButton">Registrarse</button>
        `;
        toggleText.textContent = '¿Ya tienes cuenta?';
        document.getElementById('toggleButton').textContent = 'Iniciar Sesión';

        document.getElementById('password').addEventListener('input', function() {
            const confirmPasswordContainer = document.getElementById('confirmPasswordContainer');
            if (this.value) {
                confirmPasswordContainer.style.display = 'block';
            } else {
                confirmPasswordContainer.style.display = 'none';
            }
        });

    } else {
        formTitle.textContent = 'Iniciar Sesión';
        submitButton.textContent = 'Iniciar Sesión';
        loginForm.innerHTML = `
            <div class="form-group">
                <label for="username">Nombre de usuario</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" id="submitButton">Iniciar Sesión</button>
        `;
        toggleText.textContent = '¿No tienes cuenta?';
        document.getElementById('toggleButton').textContent = 'Registrarse';
    }
});
