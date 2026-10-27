/*
    Propiedades: libroId, titulo, ISBN, autorId, bibliotecaId, prestamos (lista con la fecha de 
    préstamo y fecha de devolución), estaDisponible (calculada).

    Métodos: 
        • generarHTMLCreacion(): Formulario para crear un nuevo libro. 
        • generarHTMLPropiedades(): Detalles del libro. Incluye opciones de menú para: 
            editar, borrar, listar prestamos, crear préstamo, devolver préstamo, listar préstamos. 
        • generarHTMLEdicion(): Formulario para editar un libro. 
        • generarHTMLListadoPrestamos(): Listado de préstamos.

    NOTA: te doy libertad para que pienses como gestionar la solicitud de préstamo y 
        devolución. 
*/

class Libro{
    #_libroid;
    #titulo;
    #isbn;
    #autorid;
    #bibliotecaid;
    #prestamos;


    constructor(libroid = 0, titulo, isbn, autorid, bibliotecaid, prestamos){
        this.#_libroid = libroid;
        this.#titulo = titulo;
        this.#isbn = isbn;
        this.#autorid = autorid;
        this.#bibliotecaid = bibliotecaid;
        this.#prestamos =  prestamos;
    }

    estaDisponible(){
        if(this.#prestamos.lenght !== 0){
            return 'no disponible'
        }else{
            return 'disponible'
        }
    }

    get libroid(){
        return this.#_libroid;
    }

    set #libroid(id){
        if(id !== null){
            this.#_libroid = id;
        }
        return;
    }

    get titulo(){
        return this.#titulo;
    }

    get isbn(){
        return this.#isbn;
    }

    get autorid(){
        return this.#autorid;
    }

    get bibliotecaid(){
        return this.#bibliotecaid;
    }

    get prestamos(){
        return this.#prestamos;
    }

    generarHTMLCreacion(){
        return ``;
    }
    
    generarHTMLPropiedades(){
        return ``;   
    }

    generarHTMLEdicion(){
        return ``;
    }

    generarHTMLLIstadoPrestamos(){
        return ``;
    }
}
export default Libro;