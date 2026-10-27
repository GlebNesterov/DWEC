import Libro from '/biblioteca/clases/libro.js';
import Autor from '/biblioteca/clases/autor.js';
import Biblioteca from '/biblioteca/clases/biblioteca.js';
import datos from '/biblioteca/data/datos.js';
import { esc } from '../clases/utilidades.js';

const $biblio = (function (){
    let libros = [];
    let autores = [];
    let bibliotecas = [];

    // METODOS PRIVADOS
    function procesarLibros(){
        return libros.map();
    }

    function procesarAutores(){
        return autores.map();
    }

    function procesarBibliotecas(){
        return bibliotecas.map();
    }

    // GENERAR HTML

    function generarListadoAutores(){
        return ``;
    }

    function generarHTMLListadoBiblioteca(){
        return ``;
    }

    function generarHTMLListadoLibros(){
        return ``;
    }

    function generarHTMListadoBuscador(){
        return ``;
    }

    // BUSCAR LIBRO POR NOMBRE O AUTOR

    function buscarLibroPorTitulo(titulo){
        
    }

    function buscarLibroPorAutor(autor){

    }

    // BUSCAR POR IDS

    function buscarLibro(id){

    }

    function buscarAutor(id){

    }

    function buscarBiblioteca(id){

    }

    // CREACION DE OBJETOS

    function crearLibro(libro){

    }

    function crearAutor(autor){

    }

    function crearBiblioteca(biblioteca){

    }

    // BORRAR OBJETOS

    function borrarLibro(id){

    }

    function borrarAutor(id){

    }

    function borrarBiblioteca(id){

    }

    // PRESTAMOS

    function crearPrestamo(libro){

    }

    function devolverPrestamo(){
        
    }

    return {
        
    };
})();