document.addEventListener('DOMContentLoaded', function () {
    const buscarButton = document.getElementById('buscar');
    const buscador = document.querySelector('.buscador');
    const botonHamburguesa = document.getElementById('boton_hamburguesa');
    const menuHamburguesa = document.getElementById('menu_hamburguesa');

    // Manejar el evento de entrar al área del botón o del buscador
    buscarButton.addEventListener('mouseenter', function () {
        buscador.classList.add('activo');
        const input = buscador.querySelector('input');
        input.focus();
    });
    // Manejar el evento de salir del área del botón o del buscador
    buscador.addEventListener('mouseleave', function () {
        buscador.classList.remove('activo');
    });
    // Maneja el clic en el botón hamburguesa
    botonHamburguesa.addEventListener('click', function () {
        menuHamburguesa.classList.toggle('mostrando');
        this.querySelector('#menu_hamburguesa span').classList.toggle('rotar');
    });
});
document.getElementById('menu_desplegable').addEventListener('mouseenter', function() {
    var submenu = document.querySelector('.submenu');
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
});