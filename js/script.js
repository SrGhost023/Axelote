document.addEventListener('DOMContentLoaded', function () {
    const buscarButton = document.getElementById('buscar');
    const buscador = document.querySelector('.buscador');

    // Manejar el evento de entrar al área del botón o del buscador
    buscarButton.addEventListener('mouseenter', function () {
        buscador.classList.add('active');
        const input = buscador.querySelector('input');
        input.focus();
    });

    // Manejar el evento de salir del área del botón o del buscador
    buscador.addEventListener('mouseleave', function () {
        buscador.classList.remove('active');
    });
});

document.getElementById("boton_hamburguesa").addEventListener("click", function () {
    var menu = document.getElementById("menu_hamburguesa");
    var icono = document.querySelector("#boton_hamburguesa span");

    menu.classList.toggle("mostrando");
    icono.classList.toggle("rotar");
    if (menu.style.display === "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
});