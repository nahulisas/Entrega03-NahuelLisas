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


// Array de productos
let misProductos = [
    // {
    //     id: "campera"
    // },
    // {
    //     id: "asd"
    // },
    // {
    //     id: "casdasdampera"
    // },
    // {
    //     id: "campeasdra"
    // },
    // {
    //     id: "campeasdra"
    // },
    // {
    //     id: "campera"
    // },

]

// Agregar productos a mi Array de productos
let agregar_producto = () => {

    let producto = {
        nombre: nombre.value,
        precio: precio.value,
        descripcion: descripcion.value,
        id: categoriaProducto.value,
    }

    if (nombre.value === '' || precio.value === '' || descripcion.value === '' || categoriaProducto.value === '') {
        alert('todos los campos son obligatorios')
    } else {

        misProductos.unshift(producto)
        console.log(misProductos);

        injectarProductos(misProductos)
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
                        <div class="btn-agregar-carro">
                            <a href="">Agregar al carrito</a>
                        </div>
                    </div>
                </div>
        `

        productContainer.appendChild(producto)
    })
}


// evitar recargar pagina con formulario
myForm.addEventListener("submit", (evento) => {
    evento.preventDefault()
})

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
    let productosFiltrados = misProductos.filter(e => e.id == categoria || 'todos_los_productos' == categoria)
    console.log(productosFiltrados);
    injectarProductos(productosFiltrados)

}

listItem.forEach(item => {
    item.addEventListener('click', event => {
        let categoria = event.target.id
        filtrarCategorias(categoria)
    })
})




























