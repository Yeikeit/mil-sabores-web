const main = document.querySelector('div.principal#principal')
const URL = "./assets/product.json";
let product = []


function mostrarProductos({ id, imagen, nombre, precio, descripcion } = product) {
    return ` 
                    <img src="assets/${imagen}" class="card-img-top" alt="${nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${nombre}:</h5>
                        <p class="card-text">${descripcion}</p>
                        <div class="mt-auto">
                            <span class="text-ch--pink h5">${precio}</span>
                            <button id="${id}" class="btn btn-ch--pink btn-sm float-end">Agregar al carrito</button>
                        </div>
                    </div>


            `;
}

function cargarProductos(array) {
    main.innerHTML = '';
    if (array.length > 0) {
        array.forEach((product) => {
            main.innerHTML += mostrarProductos(product);
        });
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