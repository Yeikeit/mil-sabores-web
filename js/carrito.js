const main = document.querySelector("div.principal#principal");

function mostrarProductos({ id, nombre, precio, cantidad } = product) {
    return `<tr class='tablabody'>
                <td>${nombre}</td>
                <td>$${precio}</td>
                <td id="${id}"class="eliminar" >❌</td>
            </tr>`;
}



// Función para mostrar productos en la página
function mostrarProductos() {
    let contenedor = document.getElementById("productos-carrito");
    contenedor.innerHTML = "";

    if (miCarrito.length === 0) {
    contenedor.innerHTML = `
                    <div class="text-center p-4">
                        <i class="bi bi-cart-x" style="font-size: 4rem; color: #ccc;"></i>
                        <h4 class="mt-3 text-muted">Tu carrito está vacío</h4>
                        <p>Agrega algunos productos para empezar a comprar</p>
                    </div>
                `;
    } else {
    for (let i = 0; i < miCarrito.length; i++) {
        let producto = miCarrito[i];
      let subtotalProducto = producto.precio * producto.cantidad;

        contenedor.innerHTML += `
                        <div class="row align-items-center border-bottom py-3">
                            <div class="col-2">
                                <img src="${producto.imagen}" alt="${
        producto.nombre
        }" class="img-fluid rounded">
                            </div>
                            <div class="col-4">
                                <h6>${producto.nombre}</h6>
                                <small class="text-muted">Precio: $${producto.precio.toLocaleString()}</small>
                            </div>
                            <div class="col-3">
                                <div class="input-group">
                                    <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${i}, -1)">-</button>
                                    <input type="text" class="form-control form-control-sm text-center" value="${
                                        producto.cantidad
                                    }" readonly>
                                    <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${i}, 1)">+</button>
                                </div>
                            </div>
                            <div class="col-2">
                                <strong>$${subtotalProducto.toLocaleString()}</strong>
                            </div>
                            <div class="col-1">
                                <button class="btn btn-outline-danger btn-sm" onclick="eliminarProducto(${i})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    `;
    }
}

calcularTotal();
}

// Función para cambiar cantidad de productos
function cambiarCantidad(indice, cambio) {
  miCarrito[indice].cantidad += cambio;

  if (miCarrito[indice].cantidad <= 0) {
    eliminarProducto(indice);
  } else {
    guardarCarrito();
    mostrarProductos();
  }
}

// Función para eliminar un producto
function eliminarProducto(indice) {
  let nombreProducto = miCarrito[indice].nombre;

  if (
    confirm(`¿Estás seguro que quieres eliminar ${nombreProducto} del carrito?`)
  ) {
    miCarrito.splice(indice, 1);
    guardarCarrito();
    mostrarProductos();
    alert("Producto eliminado del carrito");
  }
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
  if (miCarrito.length === 0) {
    alert("El carrito ya está vacío");
    return;
  }

  if (confirm("¿Estás seguro que quieres vaciar todo el carrito?")) {
    miCarrito = [];
    guardarCarrito();
    mostrarProductos();
    alert("Carrito vaciado");
  }
}

// Función para calcular el total
function calcularTotal() {
  let subtotal = 0;

  for (let i = 0; i < miCarrito.length; i++) {
    subtotal += miCarrito[i].precio * miCarrito[i].cantidad;
  }

  let costoEnvio = miCarrito.length > 0 ? 5000 : 0;
  let total = subtotal + costoEnvio;

  document.getElementById("subtotal").textContent =
    "$" + subtotal.toLocaleString();
  document.getElementById("total-final").textContent =
    "$" + total.toLocaleString();
}

// Función para finalizar compra
function finalizarCompra() {
  if (miCarrito.length === 0) {
    alert("No tienes productos en el carrito");
    return;
  }

  let subtotal = 0;
  for (let i = 0; i < miCarrito.length; i++) {
    subtotal += miCarrito[i].precio * miCarrito[i].cantidad;
  }
  let total = subtotal + 5000;

  let mensaje = `¿Confirmas tu compra?\n\nResumen:\n`;
  for (let i = 0; i < miCarrito.length; i++) {
    let producto = miCarrito[i];
    mensaje += `- ${producto.nombre} x${producto.cantidad}: $${(
      producto.precio * producto.cantidad
    ).toLocaleString()}\n`;
  }
  mensaje += `\nEnvío: $5.000\nTotal: $${total.toLocaleString()}`;

  if (confirm(mensaje)) {
    alert(
      "¡Compra realizada con éxito!\n\nGracias por tu compra. Te enviaremos un email con los detalles."
    );
    miCarrito = [];
    guardarCarrito();
    mostrarProductos();
  }
}
