// Arrays
let misProductos = JSON.parse(localStorage.getItem('misProductos')) || []
// let misProductos = [
//     {
//         nombre: "Remera",
//         precio: Number(1500),
//         descripcion: 'El mejor',
//         categoria: "remeras",
//         id: 1,
//     },
//     {
//         nombre: "Campera",
//         precio: Number(4500),
//         descripcion: 'La mas abrigada',
//         categoria: "camperas",
//         id: 2,
//     },
//     {
//         nombre: "Pantalon",
//         precio: Number(3799),
//         descripcion: 'El mas mejor',
//         categoria: "pantalones",
//         id: 3,
//     },
//     {
//         nombre: "Zapatilla",
//         precio: Number(10000),
//         descripcion: 'La mas comoda',
//         categoria: "zapatillas",
//         id: 4,
//     }
// ]
let carrito = JSON.parse(localStorage.getItem('carrito')) || []

// Objetos del DOM
let formContainer = document.querySelector('.form_container')
let productContainer = document.querySelector('.product_container')
let btnCrearProducto = document.getElementById('drop_form')
let btnAgregarProducto = document.getElementById('agregar_producto')
let myForm = document.getElementById('form')
let nombre = document.getElementById('nombre')
let precio = document.getElementById('precio')
let descripcion = document.getElementById('descripcion')
let categoriaProducto = document.getElementById('categoria')

let contadorCarrito = document.getElementById("carrito_contador")
contadorCarrito.innerText = carrito.length


// Agregar productos a mi Array de productos

let id = 0

let agregar_producto = () => {

    let producto = {
        nombre: nombre.value,
        precio: Number(precio.value),
        descripcion: descripcion.value,
        categoria: categoriaProducto.value,
        id: id++,
    }


    if (nombre.value === '' || precio.value === '' || descripcion.value === '' || categoriaProducto.value === '') {
        alert('todos los campos son obligatorios')
    } else {
        let productoRepetido = misProductos.find(elemento => elemento.nombre == producto.nombre)
        if (productoRepetido) {
            alert('Ya existe un producto con ese nombre')
        } else {
            misProductos.unshift(producto)
            injectarProductos(misProductos)
        }

        localStorage.setItem('misProductos', JSON.stringify(misProductos))
    }
}


// injectar mis productos en el dom
let injectarProductos = (array) => {
    productContainer.innerHTML = ''
    array.forEach(elemento => {
        let producto = document.createElement('div')
        producto.innerHTML = ` 
        <div class="product_card">
        <div class="product_card_img">
        <i class="bi bi-image"></i>
        </div>
        <div class="product_card_info">
        <div class="product_card_title">${elemento.nombre}</div>
        <div class="product_card_price">$${elemento.precio}</div>
        <div class="product_card_description">
        ${elemento.descripcion}
        </div>
        <div class="">
        <a class="btn-agregar-carro" onclick="agregarAlCarrito(${elemento.id})">Agregar al carrito</a>
        </div>
        </div>
        </div>
        `

        productContainer.appendChild(producto)
        localStorage.setItem('misProductos', JSON.stringify(misProductos))
    })
}
injectarProductos(misProductos)


// Desplegar Formulario
let dropForm = () => {
    formContainer.classList.toggle('hidden')
}




// eventos
btnAgregarProducto.addEventListener('click', agregar_producto)
btnCrearProducto.addEventListener("click", dropForm)


// filtrar productos por su categoria
let listItem = document.querySelectorAll('.item_menu')

function filtrarCategorias(categoria) {
    let productosFiltrados = misProductos.filter(producto => producto.categoria == categoria || 'todos_los_productos' == categoria)
    injectarProductos(productosFiltrados)
}

listItem.forEach(item => {
    item.addEventListener('click', event => {
        let categoria = event.target.id
        filtrarCategorias(categoria)
    })
})

// agregar productos al carrito

let agregarAlCarrito = (id) => {
    let agregarProducto = misProductos.find(producto => producto.id === id)
    let buscarEnElCarrito = carrito.find(elemento => elemento.id == agregarProducto.id)

    if (buscarEnElCarrito) {
        buscarEnElCarrito.cantidad++
    } else {
        carrito.push({ ...agregarProducto, cantidad: 1, })
        contadorCarrito.innerText = carrito.length
    }

    localStorage.setItem('carrito', JSON.stringify(carrito))
}













































