let carrito = JSON.parse(localStorage.getItem('carrito')) || []

let carritoContainer = document.getElementById('carrito_container')
let contadorCarrito = document.getElementById("carrito_contador")
let vaciarCarritoBtn = document.querySelector('#vaciar_carrito')
contadorCarrito.innerText = carrito.length

let injectarProductos = (array) => {
    carritoContainer.innerHTML = ''
    array.forEach(elemento => {
        let producto = document.createElement('div')
        producto.innerHTML = `
            <div class="carrito_item">
                    <div class="item_box">
                        <img src="${elemento.images}" alt="imagen" />
                        <p>${elemento.title}</p>
                    </div>
                    <div class="item_box">
                        <div class="modificar_cantidad">
                            <button onclick="restarCantidad(${elemento.id})" id="restar_cantidad">
                                <i class="bi bi-dash"></i>
                            </button>
                            <span class="cantidad">${elemento.cantidad}</span>
                            <button onclick="sumarCantidad(${elemento.id})" id="sumar_cantidad">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                        <p class="total">$${elemento.price * elemento.cantidad}</p>
                        <button onclick="eliminarDelCarrito(${elemento.id})" class="eliminar_producto">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
        `

        carritoContainer.appendChild(producto)
    })
}

injectarProductos(carrito)


// Eliminar productos del carrito

let eliminarDelCarrito = (id) => {
    Swal.fire({
        title: "Desea eliminar este producto del carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            let indiceDelProductoAEliminar = carrito.findIndex(producto => producto.id === id)
            carrito.splice(indiceDelProductoAEliminar, 1)
            localStorage.setItem('carrito', JSON.stringify(carrito))
            injectarProductos(carrito)
            contadorCarrito.innerText = carrito.length
            Swal.fire({
                title: 'Eliminado',
                icon: "success",
                toast: true,
                position: "bottom",
                timer: 3000,
                showConfirmButton: false,
            });
        }
    });
}

sumarCantidad = (id) => {
    let productoEncontrado = carrito.find((elemento) => elemento.id == id)
    productoEncontrado.cantidad++
    localStorage.setItem('carrito', JSON.stringify(carrito))
    injectarProductos(carrito)
}

restarCantidad = (id) => {
    let productoEncontrado = carrito.find(elemento => elemento.id == id)
    if (productoEncontrado.cantidad > 1) {
        productoEncontrado.cantidad--
        localStorage.setItem('carrito', JSON.stringify(carrito))
        injectarProductos(carrito)
    }
}


