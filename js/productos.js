document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    function displayProducts(products) {
        console.log('Productos a mostrar:', products); // Verificar los datos recibidos
        productList.innerHTML = ''; // Limpiar la lista de productos
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.url_de_la_imagen}" alt="${product.nombre}">
                <h3>${product.nombre}</h3>
                <p>${product.descripcion}</p>
                <p><strong>Precio: $${product.precio.toFixed(2)}</strong></p>
                <button>Añadir al carrito</button>
            `;
            productList.appendChild(productItem);
        });
    }
    // Obtener productos desde el servidor y mostrarlos
    fetch('procesar.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            console.log('Productos recibidos:', products); // Verificar los datos recibidos
            displayProducts(products);
        })
        .catch(error => console.error('Error al cargar los productos:', error));
    // Función de filtrado de productos
    window.filterProducts = function () {
        const searchTerm = document.getElementById('search-bar').value.toLowerCase();
        fetch('procesar.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(products => {
                const filteredProducts = products.filter(product =>
                    product.nombre.toLowerCase().includes(searchTerm) ||
                    product.descripcion.toLowerCase().includes(searchTerm)
                );
                console.log('Productos filtrados:', filteredProducts); // Verificar los productos filtrados
                displayProducts(filteredProducts);
            })
            .catch(error => console.error('Error al filtrar los productos:', error));
    };
});