let product = []

const recuperarCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarProductos() {
    localStorage.setItem('carrito', JSON.stringify(product));
}