document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm =  decodeURIComponent(urlParams.get('query')); // Utiliza decodeURIComponent para decodificar
    // Verificar si el término de búsqueda es nulo
    const searchTermLower = searchTerm ? searchTerm.toLowerCase() : '';
    const searchResults = document.getElementById('search-results');

    function displayProducts(filteredProducts) {
        searchResults.innerHTML = ''; // Limpiar la lista de productos
        if (filteredProducts.length === 0) {
            searchResults.innerHTML = '<p>No se encontraron productos.</p>';
        } else {
            filteredProducts.forEach(product => {
                const productItem = document.createElement('li');
                productItem.className = 'producto';
                productItem.innerHTML = `
                    <img src="${product.url_de_la_imagen}" alt="${product.nombre}" />
                    <div class="product-info">
                        <h3>${product.nombre}</h3>
                        <p>${product.descripcion}</p>
                        <p><strong>Precio: $${product.precio.toFixed(2)}</strong></p>
                    </div>
                    <button class="agregar-al-carrito" id="agregar_al_carrito" data_product_id="${product.id}">Añadir al carrito</button>
                `;
                searchResults.appendChild(productItem);
            });
        }
    }
    // Realizar la solicitud AJAX al servidor para obtener los productos
    fetch(`procesar.php?query=${encodeURIComponent(searchTermLower)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayProducts(data); // Mostrar los productos filtrados
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            searchResults.innerHTML = '<p>Error al cargar los productos.</p>';
        });
});