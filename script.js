// Arrays
// let misProductos = JSON.parse(localStorage.getItem('misProductos')) || []
let carrito = JSON.parse(localStorage.getItem('carrito')) || []


let misProductos = []
let getProductos = fetch("https://api.escuelajs.co/api/v1/products");

getProductos
    .then((res) => res.json())
    .then((res) => {
        misProductos = res;
        injectarProductos(misProductos)
    })
    .catch((error) => console.log(error))


// Objetos del DOM

let productContainer = document.querySelector('.product_container')
let categoriaProducto = document.getElementById('categoria')
let contadorCarrito = document.getElementById("carrito_contador")
contadorCarrito.innerText = carrito.length


// Agregar productos a mi Array de productos




// injectar mis productos en el dom

let injectarProductos = (array) => {
    productContainer.innerHTML = ''


    array.forEach(elemento => {

        let buscarEnElCarrito = carrito.find(item => item.id == elemento.id)
        let producto = document.createElement('div')

        if (buscarEnElCarrito) {
            producto.innerHTML = ` 
            <div class="product_card on_cart">
            <div class="product_card_img ">
            <img src="${elemento.images[0]}">
            </div>
            <div class="product_card_info">
            <div class="product_card_title">${elemento.title}</div>
            <div class="product_card_price">$${elemento.price}</div>
            </div>
            <div class="agregar-carro-box">
            <a class="btn-agregar-carro" onclick="agregarAlCarrito(${elemento.id})">En carrito</a>
            <i class="bi bi-cart-check-fill on_cart_icon"></i>
            </div>
            </div>
        `
        } else {
            producto.innerHTML = ` 
            <div class="product_card">
            <div class="product_card_img">
            <img src="${elemento.images[0]}">
            </div>
            <div class="product_card_info">
            <div class="product_card_title">${elemento.title}</div>
            <div class="product_card_price">$${elemento.price}</div>
            </div>
            <div class="agregar-carro-box">
            <a class="btn-agregar-carro" onclick="agregarAlCarrito(${elemento.id})">Agregar al carrito</a>
            <i class="bi bi-cart-check-fill on_cart_icon"></i>
            </div>
            </div>
        `

        }


        productContainer.appendChild(producto)
        localStorage.setItem('misProductos', JSON.stringify(misProductos))
    })
}
injectarProductos(misProductos)


// Desplegar Formulario
let dropForm = () => {
    formContainer.classList.toggle('hidden')
}






// filtrar de productos

let inputSearch = document.getElementById('input_search')


// let listItem = document.querySelectorAll('.item_menu')

// function filtrarCategorias(categoria) {
//     let productosFiltrados = misProductos.filter(producto => producto.categoria == categoria || 'todos_los_productos' == categoria)
//     injectarProductos(productosFiltrados)
// }

// listItem.forEach(item => {
//     item.addEventListener('click', event => {
//         let categoria = event.target.id
//         filtrarCategorias(categoria)
//     })
// })

// agregar productos al carrito


let agregarAlCarrito = (id) => {

    let addedOnCartIcon = document.querySelector(".product_card")
    let btnAgregarCarro = document.querySelector('.btn-agregar-carro')
    let agregarProducto = misProductos.find(producto => producto.id === id)
    let buscarEnElCarrito = carrito.find(elemento => elemento.id == agregarProducto.id)

    if (buscarEnElCarrito) {
        Swal.fire({
            title: `${agregarProducto.title} ya se encuentra en el carrito`,
            position: "bottom",
            timer: 2000,
            showConfirmButton: false,
            toast: true,
        });

    } else {
        carrito.push({ ...agregarProducto, cantidad: 1, })
        addedOnCartIcon.classList.add('on_cart')
        btnAgregarCarro.textContent = 'En carrito'
        contadorCarrito.innerText = carrito.length
        injectarProductos(misProductos)

        Swal.fire({
            title: `${agregarProducto.title} agregado al carrito`,
            position: "bottom",
            timer: 1000,
            showConfirmButton: false,
            toast: true,
        });
    }


    localStorage.setItem('carrito', JSON.stringify(carrito))
}
















































