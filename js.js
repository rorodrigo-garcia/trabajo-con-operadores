class funko {
    constructor (id,titulo,valor, personaje, imagen,editorial){
        this.id=id,
        this.titulo=titulo,
        this.valor = valor,
        this.personaje= personaje,
        this.imagen= imagen
        this.editorial=editorial
    }
    mostrarDatos(){
        console.log(`El numero del funko es ${this.id} , el titulo del es ${this.titulo} , el valor es ${this.valor} y el personaje que lo protagoniza es ${this.personaje}`)
    };
}
fetch("archivo.json")
.then((resp)=> (resp.json()))
.then((data) => {console.log(data)})



let funkos = []
let funkoLS 

const cargarFunkos = async() =>{
    const resp = await fetch ("./archivo.json")
    const data = await resp.json()
    for ( let producto of data){
        let funkoNuevo = new funko(producto.id,producto.titulo,producto.valor,producto.personaje,producto.imagen,producto.editorial)
        funkos.push(funkoNuevo)
    }
    localStorage.setItem("funkos" , JSON.stringify(funkos))
}
let productoEnCarrito = localStorage.getItem("productoEnCarrito")||[]

if(localStorage.getItem("funkos") != undefined){
    funkosLS = JSON.parse(localStorage.getItem("funkos")) || []
}else{
   
   
    cargarFunkos()
    window.location.reload()
}



let contenedor = document.getElementById("contenedor")
funkosLS.forEach((funko)=>{
    let muestrafunko = document.createElement("div")
    muestrafunko.innerHTML =` <div id= "${funko.id}"class="card" style="width: 18rem; ">
    <img src="./img/${funko.imagen}" class="card-img-top" alt="${funko.titulo} de ${funko.personaje} ">
    <div class="card-body"
      <h4 class="card-title">${funko.titulo}</h4>
      <h5>${funko.personaje}
      <p class="card-text">El valor del funko es de ${funko.valor}</p>
      <button id="agregarBtn ${funko.id}" " class="agregarBtn btn-outline-success btnComprar ${funko.id}">Agregar al carrito</button>
      </div>
  </div>`
    contenedor.append(muestrafunko)
    
     let btnCompra = document.getElementsByClassName(`btnComprar ${funko.id}`)
     for(let compra of btnCompra){
     compra.addEventListener("click", ()=>{
        console.log(funko)
        agregarAlCarrito(funko)
        Toastify({
            text: "Haz agregado este funko al carrito",
            className: "info",
            
            style: {
              background: "linear-gradient(to right, black, white)",
              color: "black",
              
            }
          }).showToast();
    
     })
     }
   

})
    const buscador = document.querySelector('#buscador');
    const botonBuscador = document.querySelector('#botonBuscador');
    const resultadofunko = document.querySelector('#resultado')
    botonBuscador.addEventListener("click" , e => {
    
        e.preventDefault()
        const texto = buscador.value.toLowerCase();

        const filterArray = funkosLS.filter(e => {
            if(e.personaje.toLowerCase().includes(texto) || e.editorial.toLowerCase().includes(texto) || e.titulo.toLowerCase().includes(texto)){
                return e
            }
        });
        console.log(filterArray)
        contenedor.innerHTML = ''

        filterArray.map(e => {
                  contenedor.innerHTML += ` <div id="${(e.id)}" class="card" style="width: 18rem;">

            <img src="./img/${e.imagen}" class="card-img-top" alt="${e.titulo} de ${e.personaje} ">

            <div class="card-body"

                <h4 class="card-title">${e.titulo}</h4>

                <h5>${e.personaje}

                <p class="card-text">El valor del ${e.titulo} es de ${e.valor}</p>

                <button id="agregarBtn ${(e.id)}" " class="agregarBtn btn-outline-success botonComprarComic ${e.id}">Agregar al carrito</button>

                </div>

           </div>`
           let btnCompra = document.getElementsByClassName(`botonComprarComic ${e.id}`)
           for(let compra of btnCompra){
           compra.addEventListener("click", ()=>{
              console.log(e)
              agregarAlCarrito(e)
              Toastify({
                  text: "Haz agregado este comic al carrito",
                  className: "info",
                  
                  style: {
                    background: "linear-gradient(to right, black, white)",
                    color: "black",
                    
                  }
                }).showToast();
          
           })
           }
        })
       
    })
    
    
    



function agregarAlCarrito(funko){
    productoEnCarrito.push(funko)
    cargarProductosCarrito(productoEnCarrito)
    localStorage.setItem("productoDelCarrito" , JSON.stringify(productoEnCarrito))
    localStorage.setItem("productoCargado" , JSON.stringify(cargarProductosCarrito))
    
}
localStorage.getItem(cargarProductosCarrito)


let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modal-body")

let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
botonFinalizarCompra.addEventListener(`click` , ()=>{  
    Swal.fire({
        title: '¿Estas seguro de tu compra?',
        text: "Haz click para seguir ",
        icon: 'seccess',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,lo quiero'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
          title:  'Su compra ha sido realizada',
           text: 'Te enviaremos un mensaje por tu compra',
            icon :'success',
            confirmButtonText : 'Acepto'
          }
            
          )
        }
      })
})

let parrafoCompra = document.getElementById(`precioTotal`)    

function cargarProductosCarrito(array){

    modalBody.innerHTML = ""
    array.forEach((funko)=>{

        modalBody.innerHTML += ` <div id= "${funko.id}"class="card" style="width: 18rem;">
        <img src="./img/${funko.imagen}" class="card-img-top" alt="${funko.titulo} de ${funko.personaje} ">
        <div class="card-body"
          <h4 class="card-title">${funko.titulo}</h4>
          <h5>${funko.personaje}
          <p class="card-text">El valor del funko es de ${funko.valor}</p>
          <button id="agregarBtn ${funko.id}" " class="agregarBtn btn-outline-success btnComprar ${funko.id}">Agregar al carrito</button>
          </div>
      </div>`
    })
    
    compraTotal(array)
}

function compraTotal(array){
    let acumulador = 0

    acumulador = array.reduce((acumulador, productoCarrito)=>{
        return acumulador + productoCarrito.valor
    },0)
    console.log(`el total ${acumulador}`)
    // if(acumulador == 0){
    //     parrafoCompra.innerHTML = ""
    // }
    // else{
    //     parrafoCompra.innerHTML = `El total de su compra es ${acumulador}`
    // }
    acumulador == 0 ? parrafoCompra.innerHTML="" : parrafoCompra.innerHTML = `El total de su compra es ${acumulador}`
}










