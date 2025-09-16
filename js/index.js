
let productos = []

    // Función simple para agregar un producto al carrito
function agregarProducto(id, nombre, precio) {
    // Crear objeto del producto
    const producto = {
        id: id,
        nombre: nombre,
        precio: precio
    };
    

    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    
    // Buscar si el producto ya existe
    let encontrado = false;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            // Si existe, aumentar cantidad
            carrito[i].cantidad += 1;
            encontrado = true;
            break;
        }
    }
    
    // Si no existe, agregarlo nuevo
    if (!encontrado) {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar contador del carrito
    actualizarContadorCarrito();
    
    // Mostrar mensaje
    alert('Producto agregado al carrito!');
}

// Función para actualizar el contador del carrito en el menú
function actualizarContadorCarrito() {
    // Obtener carrito
    const carritoGuardado = localStorage.getItem('carrito');
    let totalProductos = 0;
    
    if (carritoGuardado) {
        const carrito = JSON.parse(carritoGuardado);
        
        // Contar todos los productos
        for (let i = 0; i < carrito.length; i++) {
            totalProductos += carrito[i].cantidad;
        }
    }
    
    // Actualizar en el HTML si existe el elemento
    const contador = document.getElementById('cartCount');
    if (contador) {
        contador.textContent = totalProductos;
    }
}


// Función para mostrar productos en la página (ejemplo básico)
function mostrarProductosEjemplo() {
    const contenedor = document.getElementById('productos-lista');
    
    if (contenedor) {
        let html = '';
        
        for (let i = 0; i < productos.length; i++) {
            const prod = productos[i];
            html += `
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5>${prod.nombre}</h5>
                            <p>Precio: $${prod.precio}</p>
                            <button class="btn btn-primary" 
                                    onclick="agregarProducto(${prod.id}, '${prod.nombre}', ${prod.precio})">
                                Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        contenedor.innerHTML = html;
    }
}