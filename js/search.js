document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Producto 1", price: 100.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 1" },
        { id: 2, name: "Producto 2", price: 150.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 2" },
        { id: 3, name: "Producto 3", price: 200.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 3" },
        { id: 4, name: "Producto 4", price: 250.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 4" },
        { id: 5, name: "Producto 5", price: 300.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 5" },
        { id: 6, name: "Producto 6", price: 350.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 6" },
        { id: 7, name: "Producto 7", price: 400.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 7" },
        { id: 8, name: "Producto 8", price: 450.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 8" },
        { id: 9, name: "Producto 9", price: 500.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 9" },
        { id: 10, name: "Producto 10", price: 550.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 10" },
        { id: 11, name: "Producto 11", price: 600.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 11" },
        { id: 12, name: "Producto 12", price: 650.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 12" }
    ];

    // Obtener el término de búsqueda de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('query').toLowerCase();

    const searchResults = document.getElementById('search-results');

    function displayProducts(filteredProducts) {
        searchResults.innerHTML = ''; // Limpiar la lista de productos
        if (filteredProducts.length === 0) {
            searchResults.innerHTML = '<p>No se encontraron productos.</p>';
        } else {
            filteredProducts.forEach(product => {
                const productItem = document.createElement('li'); // Cambiar de 'div' a 'li'
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p><strong>Precio: $${product.price.toFixed(2)}</strong></p>
                    </div>
                    <button>Añadir al carrito</button>
                `;
                searchResults.appendChild(productItem);
            });
        }
    }

    // Filtrar productos según el término de búsqueda
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    // Mostrar productos filtrados
    displayProducts(filteredProducts);
});
