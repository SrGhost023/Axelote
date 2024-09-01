const carrusel = document.querySelector('.carrusel');
const anterior = document.querySelector('.anterior');
const siguiente = document.querySelector('.siguiente');
const indicadores = document.querySelectorAll('.indicador');
let currentIndex = 0;
const totalItems = document.querySelectorAll('.carrusel-item').length;

function mostrarProducto(index) {
    if (index >= totalItems) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalItems - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    carrusel.style.transform = `translateX(${offset}%)`;
    actualizarIndicadores();
}

function actualizarIndicadores() {
    indicadores.forEach((indicador, index) => {
        indicador.classList.toggle('activo', index === currentIndex);
    });
}

function iniciarAutoSlide() {
    return establecerIntervalo(() => {
        mostrarProducto(currentIndex + 1);
    }, 5000); // Cambia de producto cada 5 segundos
}

let autoSlideInterval = iniciarAutoSlide();

siguiente.addEventListener('click', () => {
    mostrarProducto(currentIndex + 1);
    resetAutoSlide();
});

anterior.addEventListener('click', () => {
    mostrarProducto(currentIndex - 1);
    resetAutoSlide();
});

indicadores.forEach((indicador, index) => {
    indicador.addEventListener('click', () => {
        mostrarProducto(index);
        resetearAutoSlide();
    });
});

function resetearAutoSlide() {
    limpiarInterval(autoSlideInterval);
    autoSlideInterval = startAutoSlide();
}

mostrarProducto(currentIndex);
