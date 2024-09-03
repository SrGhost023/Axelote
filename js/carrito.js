document.addEventListener('DOMContentLoaded', () => {
    const userId = 1; // Obtén el ID del usuario de manera segura, por ejemplo, desde la sesión
    const cartItemsContainer = document.getElementById('cart-items');

    function displayCartItems(items) {
        cartItemsContainer.innerHTML = '';
        if (items.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        } else {
            items.forEach(item => {
                const itemElement = document.createElement('li');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.url_de_la_imagen}" alt="${item.nombre}" />
                    <div class="cart-item-info">
                        <h3>${item.nombre}</h3>
                        <p>${item.descripcion}</p>
                        <p><strong>Precio: $${item.precio.toFixed(2)}</strong></p>
                        <button class="remove-btn" data-id="${item.id}">❌</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }
    }
    function fetchCartItems() {
        fetch(`procesar.php?action=get_cart&user_id=${userId}`)
            .then(response => response.json())
            .then(data => {
                displayCartItems(data);
            })
            .catch(error => {
                console.error('Error al cargar los productos del carrito:', error);
                cartItemsContainer.innerHTML = '<p>Error al cargar los productos del carrito.</p>';
            });
    }
    cartItemsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('remove-btn')) {
            const cartItemId = event.target.getAttribute('data-id');

            fetch('procesar.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `action=remove_from_cart&carrito_id=${cartItemId}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchCartItems(); // Refrescar la lista de productos en el carrito
                } else {
                    console.error('Error al eliminar el producto:', data.error);
                }
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
            });
        }
    });
    fetchCartItems(); // Cargar los productos del carrito al inicio
});