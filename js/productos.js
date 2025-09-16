const main = document.querySelector('div.principal#principal')
const URL = "./assets/product.json";
let product = []


function mostrarProductos({ id, imagen, nombre, precio, descripcion } = product) {
    return `    
            <div class="col-md-3 mb-4">
                <div class="card h-100 text-center">
                    <img src="assets/${imagen}" class="card-img-top" alt="${nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-center">${nombre}:</h5>
                        <p class="card-text">${descripcion}</p>
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <span class="text-ch--pink h5 mb-0">$ ${precio}</span>
                            <button class="btn btn-ch--pink btn-sm" onclick="agregarAlCarrito(${id})">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
}


function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = total;
    }
}

// Modifica agregarAlCarrito para actualizar el contador
function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ id, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito(); // <-- Actualiza el contador
    alert('Producto agregado al carrito');
}

function cargarProductos(array) {
    main.innerHTML = '';
    const productosPorPagina = 16;
    const productosMostrados = array.slice(0, productosPorPagina);

    if (productosMostrados.length > 0) {
        for (let i = 0; i < productosMostrados.length; i += 4) {
            main.innerHTML += `<div class="row">` +
                productosMostrados.slice(i, i + 4).map(mostrarProductos).join('') +
                `</div>`;
        }
    } else {
        main.innerHTML = `<h3 class="text-center">No se encontraron productos</h3>`;
    }
}

function pedirProductos() {
    fetch(URL)
        .then(response => response.json())
        .then(data => cargarProductos(data.productos))
        .catch(error => console.error('Error cargando productos:', error));
}
pedirProductos();