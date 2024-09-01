// script.js

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');

    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('open'); // Alterna la clase 'open'
        nav.classList.toggle('open');     // Alterna la clase 'open' para el menú
    });
});
