// script.js
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
const totalItems = document.querySelectorAll('.carousel-item').length;

function showProduct(index) {
    if (index >= totalItems) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalItems - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    updateIndicators();
}

function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
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

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showProduct(index);
        resetAutoSlide();
    });
});

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = startAutoSlide();
}

showProduct(currentIndex);
