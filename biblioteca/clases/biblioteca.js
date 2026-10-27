/*
    Propiedades: bibliotecaId, nombre, ubicación, libros (lista de objetos libro asignados a la 
        biblioteca, calculada a partir de libros).

    Métodos: 
        • generarHTMLCreacion(): Formulario para crear una nueva biblioteca. 
        • generarHTMLEdicion(): Formulario para editar una biblioteca. 
*/

class Biblioteca{
    #_bibliotecaid;
    #nombre;
    #ubicacion;
    #libros
    
    constructor(bibliotecaid = 0, nombre, ubicacion, libros) {
        this.#_bibliotecaid = bibliotecaid;
        this.#nombre = nombre;
        this.#ubicacion = ubicacion;
        this.#libros = libros;
    }

    get bibliotecaid(){
        return this.#_bibliotecaid;
    }

    get nombre(){
        return this.#nombre;
    }

    get ubicacion(){
        return this.#ubicacion;
    }

    get libros(){
        return this.#libros;
    }

    generarHTMLCreacion(){
        return ``;
    }

    generarHTMLEdicion(){
        return ``;
    }
}