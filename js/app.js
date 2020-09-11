const autor = document.getElementById("inputAutor");
const titulo = document.getElementById("inputTitulo");
const tabla = document.getElementById("tbody");
const inputBuscar = document.getElementById("inputBuscar");

const libro = new Libro();

const patern = /^[a-zA-ZÁ-ÿ0-9\s]{3,100}$/;

function eventListener() {
    document.getElementById("btnAdd").addEventListener("click", prepararLibro);
    tabla.addEventListener("click", acciones);
    document.getElementById('btnVaciar').addEventListener('click', vaciarLibreria);
    document.getElementById('btnBuscar').addEventListener('click', BuscarLibro)
}

eventListener();
prepararDom();

let ultimoId = Number(LocalStorageOperation.ultimoId())
ultimoId++

function prepararLibro() {
    console.log(ultimoId)
    if ((autor.value != "" && titulo.value != "") && (patern.test(autor.value) && patern.test(titulo.value))) {

        const infoLibro = {
            id: ultimoId++,
            titulo: titulo.value.trim(),
            autor: autor.value.trim(),

        }
        let validacionExistencia = LocalStorageOperation.validarTitulo(infoLibro.titulo.trim().toLowerCase(), infoLibro.autor.trim().toLowerCase());
        if (validacionExistencia == 0) {

            let tr = libro.agregar(infoLibro);
            tabla.appendChild(tr);
            LocalStorageOperation.almacenarLibro(infoLibro);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se ha agregado el libro',
                showConfirmButton: false,
                timer: 1000
            })
            autor.value = "";
            titulo.value = "";
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Este libro ya está agregado',
                showConfirmButton: false,
                timer: 1500
            })
        }
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Datos no válidos',
            showConfirmButton: false,
            timer: 1000
        })
    }


}

function acciones(event) {
    if (event.target.tagName === 'I' || event.target.tagName === 'BUTTON') {
        if (event.target.className.includes("btn-warning") || event.target.className.includes("fa-trash")) {
            libro.eliminar(event.target);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Libro eliminado',
                showConfirmButton: false,
                timer: 1000
            })
        }
        // libro.eliminar(event.target.tagName);
    }
}

function prepararDom() {
    const librosLS = LocalStorageOperation.obtenerLS();
    console.log(librosLS);

    for (let i = 0; i < librosLS.length; i++) {
        console.log("instancia " + i);
        const instanciaLibro = new Libro();
        tabla.appendChild(instanciaLibro.agregar(librosLS[i]));
    }
}

function vaciarLibreria() {
    console.log(tabla.firstChild)
    while (tabla.firstChild) {
        tabla.firstChild.remove()
    }
    LocalStorageOperation.BorrarStorage()
}

function BuscarLibro(event) {
    event.preventDefault()
        // validar el input tenga texto
    if (inputBuscar.value != '') {
        // .trim es para que los espacios en la validacion no entren en la validacion igual .toLowercase para mayusculas
        // resultado es la salida del metodo BuscarTitulo que se encuentra en LocalStorageOperation
        let resultado = LocalStorageOperation.BuscarTitulo(inputBuscar.value.trim().toLowerCase())
        console.log(resultado);
        if (resultado != '') {
            Swal.fire(
                    'Busqueda exitosa',
                    `El libro con titulo ${resultado.titulo} tiene el id ${resultado.id} y fue escrito por ${resultado.autor}`,
                    'success'
                )
                // cuando la busqueda no genera resultados regresa un '' y se imprime una alerta de error
        } else {
            Swal.fire(
                'Sin Resultados',
                `No existe el libro con titulo ${inputBuscar.value}`,
                'error'
            )
        }
    }
    inputBuscar.value = ''
}