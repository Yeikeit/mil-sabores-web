const main = document.querySelector('div.principal#principal')
const URL = "./assets/product.json";
let product = []


function mostrarProductos({ id, imagen, nombre, precio, descripcion } = product) {
    return `    
            <div class="col-md-3 mb-4">
                <div class="card h-100">
                    <img src="assets/${imagen}" class="card-img-top" alt="${nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-center">${nombre}:</h5>
                        <p class="card-text">${descripcion}</p>
                        <div class="mt-auto">
                            <span class="text-ch--pink h5">${precio}</span>
                            <a href="./productos.html" class="btn btn-ch--pink btn-sm float-end">Ver Producto</a>
                        </div>
                    </div>
                </div>
            </div>
            `;
}

// function cargarProductos(array) {
//     main.innerHTML = '';
//     if (array.length > 0) {
//         array.forEach((product) => {
//             main.innerHTML += mostrarProductos(product);
//         });
//     } else {
//         main.innerHTML = `<h3 class="text-center">No se encontraron productos</h3>`;
//     }
// }

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