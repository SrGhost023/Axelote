// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalContainer = document.getElementById('total');

    // Agregar al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const productId = product.getAttribute('data-id');
            const productName = product.getAttribute('data-name');
            const productPrice = parseFloat(product.getAttribute('data-price'));

            addToCart(productId, productName, productPrice);
        });
    });

    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        renderCart();
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                ${item.name} - $${item.price} x ${item.quantity}
                <button onclick="removeFromCart('${item.id}')">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        calculateTotal();
    }

    function calculateTotal() {
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        totalContainer.textContent = total.toFixed(2);
    }

    // Eliminar del carrito
    window.removeFromCart = function(id) {
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
            renderCart();
        }
    };
});
