/*
    Propiedades: autorId, nombre, nacionalidad, biografía, libros (lista con los títulos de los 
    libros publicados (UN TÍTULO NO ES UN ID)). 

    Métodos: 
        • generarHTMLCreacion(): Formulario para crear un nuevo autor. 
        • generarHTMLPropiedades(): Detalles del autor y una tabla con los libros 
        publicados. Incluye opciones de menú para: añadir y eliminar libros. 
        • generarHTMLEdicion(): Formulario para editar un autor. 

    NOTA: te doy libertad para que pienses como gestionar la añadir y eliminar libros. 

*/

class Autor {
    #_autorid;
    #nombre;
    #nacionalidad;
    #biografia;
    #libros

    constructor(autorid, nombre, nacionalidad, biografia, libros){
        this.#_autorid = autorid;
        this.#nombre = nombre;
        this.#nacionalidad = nacionalidad;
        this.#biografia = biografia;
        this.#libros = libros;
    }

    get autorid(){
        return this.#_autorid;
    }

    get nombre(){
        return this.#nombre;
    }

    get nacionalidad(){
        return this.#nacionalidad;
    }

    get biografia(){
        return this.#biografia;
    }
    
    get libros(){
        return this.#libros;
    }

    generarHTMCreacin(){
        return ``;
    }

    generarHTMLPropiedades(){
        return ``;
    }

    generarHTMLEdicion(){
        return ``;
    }
}
export default Autor;