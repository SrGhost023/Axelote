document.addEventListener('DOMContentLoaded', function() {
    function obtenerProductosDelCarrito() {
        fetch('procesar.php?action=get_cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text()) // Cambiado a text() para inspeccionar la respuesta
        .then(text => {
            try {
                const data = JSON.parse(text); // Intentar analizar como JSON
                if (data.error) {
                    console.error('Error al obtener productos del carrito:', data.error);
                } else {
                    mostrarProductosEnCarrito(data);
                }
            } catch (e) {
                console.error('Error al analizar la respuesta JSON:', e);
                console.error('Respuesta del servidor:', text);
            }
        })
        .catch(error => console.error('Error al hacer la solicitud:', error));
    }

    function mostrarProductosEnCarrito(productos) {
        const carritoList = document.getElementById('carrito-list');
        carritoList.innerHTML = ''; // Limpiar lista

        productos.forEach(producto => {
            const item = document.createElement('div');
            item.classList.add('carrito-item');
            item.innerHTML = `
                <img src="${producto.url_de_la_imagen}" alt="${producto.nombre}" />
                <p>${producto.nombre}</p>
                <p>${producto.descripcion}</p>
                <p>${producto.precio} USD</p>
                <button class="eliminar" data-carrito-id="${producto.id}">Eliminar</button>
            `;
            carritoList.appendChild(item);
        });

        document.querySelectorAll('.eliminar').forEach(button => {
            button.addEventListener('click', function() {
                const carritoId = this.getAttribute('data-carrito-id');
                eliminarProductoDelCarrito(carritoId);
            });
        });
    }

    function eliminarProductoDelCarrito(carritoId) {
        fetch('procesar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                action: 'remove_from_cart',
                carrito_id: carritoId
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error al eliminar producto del carrito:', data.error);
            } else {
                obtenerProductosDelCarrito(); // Actualizar lista después de eliminar
            }
        })
        .catch(error => console.error('Error al hacer la solicitud:', error));
    }

    obtenerProductosDelCarrito();
});