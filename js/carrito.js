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
    
    mostrarProductos();
    actualizarTotal();
    actualizarContador();
}

function mostrarProductos() {
    
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

function cambiarCantidad(id, nuevaCantidad) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id == id) {
            carrito[i].cantidad = parseInt(nuevaCantidad);
            break;
        }
    }
    
    guardarCarrito();
    mostrarProductos();
    actualizarTotal();
    actualizarContador();
}

function eliminarProducto(id) {
    let nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id != id) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    
    carrito = nuevoCarrito;
    
    guardarCarrito();
    mostrarProductos();
    actualizarTotal();
    actualizarContador();
}

function actualizarTotal() {
    let subtotal = 0;
    
    for (let i = 0; i < carrito.length; i++) {
        subtotal += carrito[i].precio * carrito[i].cantidad;
    }
    
    const envio = 5000;
    const total = subtotal + envio;
    
    document.getElementById('subtotal').textContent = '$' + subtotal;
    document.getElementById('total-final').textContent = '$' + total;
}

function actualizarContador() {
    let totalProductos = 0;
    
    for (let i = 0; i < carrito.length; i++) {
        totalProductos += carrito[i].cantidad;
    }
    
    const contador = document.getElementById('cartCount');
    if (contador) {
        contador.textContent = totalProductos;
    }
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function vaciarCarrito() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
        carrito = [];
        guardarCarrito();
        mostrarProductos();
        actualizarTotal();
        actualizarContador();
    }
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('No hay productos en el carrito');
        return;
    }
    
    alert('¡Compra realizada con éxito!');
    
}

function agregarAlCarrito(producto) {
    let encontrado = false;
    
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === producto.id) {
            carrito[i].cantidad += 1;
            encontrado = true;
            break;
        }
    }
    guardarCarrito();
    actualizarContador();
}

cargarCarrito();
