
let productos = []

function agregarProducto(id, nombre, precio) {
    const producto = {
        id: id,
        nombre: nombre,
        precio: precio
    };
    

    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    
    let encontrado = false;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            carrito[i].cantidad += 1;
            encontrado = true;
            break;
        }
    }
    
    if (!encontrado) {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    actualizarContadorCarrito();
    
    alert('Producto agregado al carrito!');
}

function actualizarContadorCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    let totalProductos = 0;
    
    if (carritoGuardado) {
        const carrito = JSON.parse(carritoGuardado);
        
        for (let i = 0; i < carrito.length; i++) {
            totalProductos += carrito[i].cantidad;
        }
    }
    
    const contador = document.getElementById('cartCount');
    if (contador) {
        contador.textContent = totalProductos;
    }
}


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