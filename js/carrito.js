const contenedor = document.getElementById('productos-carrito');

let carrito = [];

let productosDisponibles = [];

function cargarCarrito() {

    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    } else {
        carrito = [];
    }
    
    // Mostrar los productos en la página
    mostrarProductos();
    actualizarTotal();
    actualizarContador();
}

// Función para mostrar los productos en el HTML
function mostrarProductos() {
    
    // Si no hay productos, mostrar mensaje vacío
    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center p-4">
                <i class="bi bi-cart-x" style="font-size: 4rem; color: #ccc;"></i>
                <h4 class="mt-3">Tu carrito está vacío</h4>
                <p>Agrega productos para empezar a comprar</p>
            </div>
        `;
        return;
    }
    
    // Si hay productos, mostrarlos uno por uno
    let html = '';
    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        html += `
            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-6">
                            <h6>${producto.nombre}</h6>
                            <small>Precio: $${producto.precio}</small>
                        </div>
                        <div class="col-3">
                            <label>Cantidad:</label>
                            <input type="number" value="${producto.cantidad}" 
                                    min="1" class="form-control" 
                                    onchange="cambiarCantidad(${producto.id}, this.value)">
                        </div>
                        <div class="col-3 text-end">
                            <p><strong>$${producto.precio * producto.cantidad}</strong></p>
                            <button class="btn btn-danger btn-sm" 
                                    onclick="eliminarProducto(${producto.id})">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    contenedor.innerHTML = html;
}

// Función para cambiar la cantidad de un producto
function cambiarCantidad(id, nuevaCantidad) {
    // Buscar el producto en el carrito
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id == id) {
            // Cambiar la cantidad
            carrito[i].cantidad = parseInt(nuevaCantidad);
            break;
        }
    }
    
    // Guardar cambios y actualizar
    guardarCarrito();
    mostrarProductos();
    actualizarTotal();
    actualizarContador();
}

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
    // Crear nuevo array sin el producto a eliminar
    let nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id != id) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    
    carrito = nuevoCarrito;
    
    // Guardar cambios y actualizar
    guardarCarrito();
    mostrarProductos();
    actualizarTotal();
    actualizarContador();
}

// Función para calcular y mostrar el total
function actualizarTotal() {
    let subtotal = 0;
    
    // Sumar el precio de todos los productos
    for (let i = 0; i < carrito.length; i++) {
        subtotal += carrito[i].precio * carrito[i].cantidad;
    }
    
    const envio = 5000;
    const total = subtotal + envio;
    
    // Mostrar en el HTML
    document.getElementById('subtotal').textContent = '$' + subtotal;
    document.getElementById('total-final').textContent = '$' + total;
}

// Función para actualizar el contador del carrito en el menú
function actualizarContador() {
    let totalProductos = 0;
    
    // Contar todos los productos
    for (let i = 0; i < carrito.length; i++) {
        totalProductos += carrito[i].cantidad;
    }
    
    // Actualizar en el HTML
    const contador = document.getElementById('cartCount');
    if (contador) {
        contador.textContent = totalProductos;
    }
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
    // Preguntar al usuario si está seguro
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
        carrito = [];
        guardarCarrito();
        mostrarProductos();
        actualizarTotal();
        actualizarContador();
    }
}

// Función para finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('No hay productos en el carrito');
        return;
    }
    
    alert('¡Compra realizada con éxito!');
    
}

// Función para agregar productos (usada desde otras páginas)
function agregarAlCarrito(producto) {
    // Buscar si el producto ya existe
    let encontrado = false;
    
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === producto.id) {
            // Si existe, aumentar cantidad
            carrito[i].cantidad += 1;
            encontrado = true;
            break;
        }
    }
    guardarCarrito();
    actualizarContador();
}

cargarCarrito();
