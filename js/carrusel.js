const carrusel = document.querySelector('.carrusel');
const prevBtn = document.querySelector('.anterior');
const nextBtn = document.querySelector('.siguiente');
const indicadores = document.querySelectorAll('.indicador');
let currentIndex = 0;
const totalItems = document.querySelectorAll('.carrusel-item').length;

function showProduct(index) {
    if (index >= totalItems) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalItems - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    carrusel.style.transform = `translateX(${offset}%)`;
    updateIndicadores();
}

function updateIndicadores() {
    indicadores.forEach((indicador, index) => {
        indicador.classList.toggle('activo', index === currentIndex);
    });
}

function startAutoSlide() {
    return setInterval(() => {
        showProduct(currentIndex + 1);
    }, 5000); // Cambia de producto cada 5 segundos
}

let autoSlideInterval = startAutoSlide();

nextBtn.addEventListener('click', () => {
    showProduct(currentIndex + 1);
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    showProduct(currentIndex - 1);
    resetAutoSlide();
});

indicadores.forEach((indicador, index) => {
    indicador.addEventListener('click', () => {
        showProduct(index);
        resetAutoSlide();
    });
});

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = startAutoSlide();
}

showProduct(currentIndex);
