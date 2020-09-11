class LocalStorageOperation {

    static almacenarLibro(infoLibro) {
        let arrayLibros = this.obtenerLS();
        arrayLibros.push(infoLibro);
        // console.log(arrayLibros);
        localStorage.setItem("Libros", JSON.stringify(arrayLibros));
    }

    static obtenerLS() {
        if (localStorage.getItem("Libros") == null) {
            // console.log("Vacío");
            return []
        } else {
            // console.log("Si hay libros");
            return JSON.parse(localStorage.getItem("Libros"));
        }
    }
    static BorrarStorage() {
        localStorage.clear()
    }

    static BorrarLibro(idLibro) {
        // console.log(idLibro)
        let arrayLibros = this.ObtenerLS()
        console.log(arrayLibros);
        let arregloNuevo = []

        for (let i = 0; i < arrayLibros.length; i++) {
            if (idLibro != arrayLibros[i].id) arregloNuevo.push(arrayLibros[i])
        }
        console.log(arregloNuevo);
        localStorage.setItem('Libros', JSON.stringify(arregloNuevo))
    }
    static ultimoId() {
        let arrayLibros = this.obtenerLS()
        if (arrayLibros == 0) return 0
        return (arrayLibros[arrayLibros.length - 1].id)
    }
    static BuscarTitulo(titulo) {
        // titulo viene de app.js y es el valor de un imput
        // para nuestro metodo, titulo sera nuestro parametro de buqueda
        console.log(titulo);
        let arrayLibros = this.obtenerLS()
        let resultado = ''
            // reiteramis nuestro array de libros mediante un ciclo
            // ponemos i< arrayLÑibros para ahorrarnos una vuelta de mas en el ciclo
        for (let i = 0; i < arrayLibros.length; i++) {
            if (arrayLibros[i].titulo.toLowerCase() == titulo) {
                resultado = arrayLibros[i];

            }
        }
        return resultado
    }
    static validarTitulo(titulo, autor) {
        let arrayLibros = this.obtenerLS();
        let band = 0;

        for (let i = 0; i < arrayLibros.length; i++) {
            if ((titulo == arrayLibros[i].titulo.trim().toLowerCase()) && (autor == arrayLibros[i].autor.trim().toLowerCase())) {
                band = 1;
            }
        }

        
        return band;
    }
}