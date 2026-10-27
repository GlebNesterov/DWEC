class Libro{
    #_libroid;
    #titulo;
    #isbn;
    #autorid;
    #bibliotecaid;
    #prestamos;


    constructor(libroid, titulo, isbn, autorid, bibliotecaid, prestamos){
        this.#_libroid = libroid;
        this.#titulo = titulo;
        this.#isbn = isbn;
        this.#autorid = autorid;
        this.#bibliotecaid = bibliotecaid;
        this.#prestamos = prestamos;
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

    
}