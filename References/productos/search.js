document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Producto 1", price: 100.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 1", category: "Electrónica" },
        { id: 2, name: "Producto 2", price: 150.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 2", category: "Ropa" },
        { id: 3, name: "Producto 3", price: 200.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 3", category: "Hogar" },
        { id: 4, name: "Producto 4", price: 250.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 4", category: "Juguetes" },
        { id: 5, name: "Producto 5", price: 300.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 5", category: "Electrónica" },
        { id: 6, name: "Producto 6", price: 350.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 6", category: "Ropa" },
        { id: 7, name: "Producto 7", price: 400.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 7", category: "Hogar" },
        { id: 8, name: "Producto 8", price: 450.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 8", category: "Juguetes" },
        { id: 9, name: "Producto 9", price: 500.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 9", category: "Electrónica" },
        { id: 10, name: "Producto 10", price: 550.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 10", category: "Ropa" },
        { id: 11, name: "Producto 11", price: 600.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 11", category: "Hogar" },
        { id: 12, name: "Producto 12", price: 650.00, image: "https://via.placeholder.com/150", description: "Descripción del Producto 12", category: "Juguetes" }
    ];

    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Obtener el término de búsqueda de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('query') ? urlParams.get('query').toLowerCase() : '';

    searchInput.value = searchTerm;

    function displayProducts(filteredProducts) {
        searchResults.innerHTML = ''; // Limpiar la lista de productos
        if (filteredProducts.length === 0) {
            searchResults.innerHTML = '<p>No se encontraron productos.</p>';
        } else {
            filteredProducts.forEach(product => {
                const productItem = document.createElement('li');
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

    function filterProducts(query) {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        displayProducts(filteredProducts);
    }

    // Filtrar productos según el término de búsqueda inicial
    filterProducts(searchTerm);

    // Función para filtrar por categoría
    window.filterByCategory = function(category) {
        searchInput.value = category; // Poner la categoría en el campo de búsqueda
        filterProducts(category.toLowerCase()); // Filtrar productos por la categoría
    };
});
