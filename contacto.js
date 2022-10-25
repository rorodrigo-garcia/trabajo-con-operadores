const formulario = document.getElementById("form")
const formEmail = document.getElementById("formEmail")
const textoFormulario = document.getElementById("textoFormulario")
const botonContacto = document.getElementById("botonContacto")

formulario.addEventListener('submit' ,todoElFormulario )
function todoElFormulario(){
   alert("Su formulario fue enviado")
}