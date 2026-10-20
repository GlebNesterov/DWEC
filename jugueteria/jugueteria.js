import Juguete from "./juguete";
import datos from "./datos";


class Jugueteria{
    //contenedor: privado. Referencia al contenedor donde se renderiza la aplicación.
    //juguetes: privado. Lista de juguetes (clase Juguete).
    //contador: privado. Almacena el jugueteId máximo
    #contenedor;
    #juguetes;
    #contador;

    //constructor(): Carga los datos de prueba, inicializa la lista juguetes y el contador.
    constructor(){

        this.#contador = 0;
        this.#juguetes = [];
    }

    iniciarApp(selector){
        if(document.querySelector(selector)){
            return 
        }else{

        }
    }

    obtenerJuguetes(filtro){
        
    }

    obtenerJuguete(id){

    }

    crearJuguete(){
        ++this.#contador;

        let jug = new Juguete();
    }

    borrarJuguete(id){

    }
}
