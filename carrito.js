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
                        <img src="" alt="imagen" />
                        <p>${elemento.nombre}</p>
                    </div>
                    <div class="item_box">
                        <div class="modificar_cantidad">
                            <button onclick="restarCantidad(${elemento.id})" id="restar_cantidad">
                                <i class="bi bi-dash"></i>
                            </button>
                            <p class="cantidad">${elemento.cantidad}</p>
                            <button onclick="sumarCantidad(${elemento.id})" id="sumar_cantidad">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                        <p class="total">$${elemento.precio * elemento.cantidad}</p>
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
    let productoEliminado = carrito.findIndex(producto => producto.id === id)
    carrito.splice(productoEliminado, 1)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    injectarProductos(carrito)
    contadorCarrito.innerText = carrito.length
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


