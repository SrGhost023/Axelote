document.addEventListener("DOMContentLoaded", function () {
    const carrusel = document.querySelector(".carrusel");
    const items = document.querySelectorAll(".carrusel-item");
    const totalItems = items.length;
    const indicadores = document.querySelectorAll(".indicador");
    const intervalo = 3000; // Intervalo de 3 segundos
    let index = 0; // Empezar en el primer ítem

    // Clonar el primer y último ítem
    const primerItem = carrusel.firstElementChild.cloneNode(true);
    const ultimoItem = carrusel.lastElementChild.cloneNode(true);

    carrusel.appendChild(primerItem);
    carrusel.insertBefore(ultimoItem, carrusel.firstChild);

    // Ajustar el índice inicial
    carrusel.style.transform = `translateX(-${100}%)`;

    function mostrarImagen(index) {
        const desplazamiento = -((index + 1) * 100); // Ajustar el desplazamiento
        carrusel.style.transform = `translateX(${desplazamiento}%)`;
        indicadores.forEach(indicador => indicador.classList.remove("activo"));
        indicadores[index % (totalItems - 2)].classList.add("activo");
    }

    function siguienteImagen() {
        index++;
        if (index >= totalItems) {
            index = 0;
            carrusel.style.transition = 'none'; // Desactivar la transición
            carrusel.style.transform = `translateX(-${(index + 1) * 100}%)`;
            setTimeout(() => {
                carrusel.style.transition = 'transform 0.5s ease-in-out'; // Reactivar la transición
                index++;
                mostrarImagen(index);
            }, 50);
        } else {
            mostrarImagen(index);
        }
    }

    function imagenAnterior() {
        index--;
        if (index < 0) {
            index = totalItems - 2;
            carrusel.style.transition = 'none'; // Desactivar la transición
            carrusel.style.transform = `translateX(-${(index + 1) * 100}%)`;
            setTimeout(() => {
                carrusel.style.transition = 'transform 0.5s ease-in-out'; // Reactivar la transición
                index--;
                mostrarImagen(index);
            }, 50);
        } else {
            mostrarImagen(index);
        }
    }

    document.querySelector(".siguiente").addEventListener("click", siguienteImagen);
    document.querySelector(".anterior").addEventListener("click", imagenAnterior);

    setInterval(siguienteImagen, intervalo);
});
