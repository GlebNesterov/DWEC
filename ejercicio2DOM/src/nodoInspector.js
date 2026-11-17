class NodoInspector{
    #nodoActual;

    constructor (nodoActual){
        this.#nodoActual = nodoActual;
    }

    get esRaiz(){
        return this.#nodoActual === document.body;
    }

    get esPrimerHijo(){
        return !this.esRaiz && this.#nodoActual.parentElement?.firstElementChild === this.#nodoActual;
    }

    get esUltimoHijo(){
        return !this.esRaiz && this.#nodoActual.parentElement?.lastElementChild === this.#nodoActual;
    }

    get tieneHijos(){
        return this.#nodoActual.children.length > 0;
    }
    
    obtenerInfo(){
        const textoNodo = Array.from(this.#nodoActual,childNodes)
                                .filter(n => n.nodeType === Node.TEXT_NODE)
                                .map(n => n.textContent.trim())
                                .filter(t => t !== '').join('');
        return {
            etiqueta: this.#nodoActual.tagName,
            identificador: this.#nodoActual.id || 'noid',
            clases: Array.from(this.#nodoActual.classList),
            texto: textoNodo
        }
    }

    irAlPadre(){
        if(this.#nodoActual.parentElement){
            this.#actualizarNodo(this.#nodoActual.parentElement);
        }
    }

    irAlPrimerHijo(){
        if(this.#nodoActual.firstElementChild){
            this.#actualizarNodo(this.#nodoActual.firstElementChild);
        }
    }

    irAlUltimoHijo(){
        if(this.#nodoActual.lastElementChild){
            this.#actualizarNodo(this.#nodoActual.lastElementChild);
        }
    }

    irAlAnteriorHermano(){
        if(this.#nodoActual.previouseElementSibling){
            this.#actualizarNodo(this.#nodoActual.previouseElementSibling);
        }
    }

    irAlSiguienteHermano(){
        if(this.#nodoActual.nextElementSibling){
            this.#actualizarNodo(this.#nodoActual.nextElementSibling);
        }
    }

    #actualizarNodo(nuevoSeleccionado){
       this.#nodoActual.toggle('.resaltado');
       this.#nodoActual = document.querySelector(nuevoSeleccionado);
       this.#nodoActual.toggle('.resaltado');
    }
}

export default NodoInspector;