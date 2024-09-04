document.addEventListener('DOMContentLoaded', function () {
    const buscarButton = document.getElementById('buscar');
    const buscador = document.querySelector('.buscador');
    const botonHamburguesa = document.getElementById('boton_hamburguesa');
    const menuHamburguesa = document.getElementById('menu_hamburguesa');
    const menuDesplegable = document.getElementById('menu_desplegable');
    const submenu = menuDesplegable.querySelector('.submenu');

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
    // Manejar el clic en el botón hamburguesa
    botonHamburguesa.addEventListener('click', function (event) {
        event.stopPropagation(); // Evita que el clic en el botón cierre el menú hamburguesa
        menuHamburguesa.classList.toggle('mostrando');
    });
    // Cierra el menú hamburguesa si se hace clic fuera de él
    document.addEventListener('click', function (event) {
        if (!menuHamburguesa.contains(event.target) && !botonHamburguesa.contains(event.target)) {
            menuHamburguesa.classList.remove('mostrando');
        }
    });
    menuDesplegable.querySelector('button').addEventListener('click', function(event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del botón
        submenu.classList.toggle('visible'); // Alterna la clase 'visible'
    });
});