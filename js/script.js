document.addEventListener('DOMContentLoaded', function () {
    const buscarButton = document.getElementById('buscar');
    const buscador = document.querySelector('.buscador');
    const botonHamburguesa = document.getElementById('boton_hamburguesa');
    const menuHamburguesa = document.getElementById('menu_hamburguesa');

    // Manejar el evento de entrar al área del botón o del buscador
    buscarButton.addEventListener('click', function () {
        buscador.classList.add('activo');
        const input = buscador.querySelector('input');
        input.focus();
    });

    // Mantener el buscador visible mientras el input está enfocado
    buscador.addEventListener('focusin', function () {
        buscador.classList.add('activo');
    });

    // Manejar el clic fuera del buscador para ocultarlo
    document.addEventListener('click', function (event) {
        if (!buscador.contains(event.target) && event.target !== buscarButton) {
            buscador.classList.remove('activo');
        }
    });

    // Maneja el clic en el botón hamburguesa
    botonHamburguesa.addEventListener('click', function () {
        menuHamburguesa.classList.toggle('mostrando');
        this.querySelector('#menu_hamburguesa span').classList.toggle('rotar');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const menuDesplegable = document.getElementById('menu_desplegable');
    const submenu = menuDesplegable.querySelector('.submenu');

    menuDesplegable.querySelector('button').addEventListener('click', function(event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del botón
        submenu.classList.toggle('visible'); // Alterna la clase 'visible'
    });
});
