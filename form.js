
let openFormBtn = document.querySelector('#openFormBtn')
let signUpBtn = document.querySelector('#signup_btn')
let loginBtn = document.querySelector('#loginBtn')
let formularios = document.querySelector('.formularios')
let ingresarBtn = document.querySelector('#ingresarBtn')
console.log(ingresarBtn);















// Abrir y cerrar formulario de inicio de secion
openFormBtn.addEventListener('click', () => {
    formularios.classList.add('mostrar')
})

let closeFormBtn = () => {
    formularios.classList.remove('mostrar')
}


// Abrir formulario de registro
signUpBtn.addEventListener('click', () => {
    formularios.classList.add('active')
})

loginBtn.addEventListener('click', () => {
    formularios.classList.remove('active')
})







