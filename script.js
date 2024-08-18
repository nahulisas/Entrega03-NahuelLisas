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
        producto.classList.add("col", "col-lg-4",)

        if (buscarEnElCarrito) {

            producto.innerHTML = `
                    
                        <div class="card on_cart" style="width: 30rem;">
                            <img src="${elemento.images[0]}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${elemento.title}</h5>
                                <p class="card-text">$${elemento.price}</p>
                                <a class="btn-agregar-carro" onclick="agregarAlCarrito(${elemento.id})">En carrito<i class="bi bi-cart-check-fill on_cart_icon"></i></a>
                                
                            </div>
                        </div>
                    
                    
            `

        } else {

            producto.innerHTML = `
                        <div class="card" style="width: 30rem;">
                            <img src="${elemento.images[0]}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${elemento.title}</h5>
                                <p class="card-text">$${elemento.price}</p>
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
inputSearch.addEventListener("input", (evento) => {
    let value = evento.target.value.toLowerCase();
    let productosFiltrados = misProductos.filter(producto => producto.title.toLowerCase().includes(value))
    injectarProductos(productosFiltrados)

}
)

// agregar productos al carrito


let agregarAlCarrito = (id) => {


    let agregarProducto = misProductos.find(producto => producto.id === id)
    let buscarEnElCarrito = carrito.find(elemento => elemento.id == agregarProducto.id)


    if (buscarEnElCarrito) {
        Swal.fire({
            title: `${agregarProducto.title} ya se encuentra en el carrito`,
            position: "bottom",
            timer: 4000,
            showConfirmButton: false,
            toast: true,
            icon: 'warning'
        });

    } else {
        carrito.push({ ...agregarProducto, cantidad: 1, })
        contadorCarrito.innerText = carrito.length
        injectarProductos(misProductos)


        Swal.fire({
            title: `${agregarProducto.title} agregado al carrito`,
            position: "bottom",
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            icon: 'success'
        });
    }


    localStorage.setItem('carrito', JSON.stringify(carrito))
}
















































