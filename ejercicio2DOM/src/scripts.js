'use strict';
import NodoInspector from "../src/nodoInspector.js";

const $depurador = (function (){
    let elemento = null;
    let panelPintado = false;
    const elementosBody = document.querySelectorAll('*');
    const nodo = new NodoInspector(elemento);
    

    function panel(){
        const conteneder = document.createElement('div');
        conteneder.classList.add('contenedorDepu');
        const botones = [
            'raiz',
            'padre',
            'primer hijo',
            'ultimo hijo',
            'hermano anterior',
            'hermano siguiente'
        ];
        
        botones.map(texto => {
                const boton =document.createElement('button');
                boton.textContent = texto;
                conteneder.appendChild(boton);
            }
        );

        document.body.append(conteneder);
        panelPintado = true;
    }

    function activarDepurador(){
        Array.from(elementosBody).forEach(el =>
            el.addEventListener('click', ()=>{
                if(!panelPintado)panel();
            })
        );
    }

    /*
    function panel(){
        //const info = JSON.stringify(inspector.obtenerInfo());
        const contenedor = document.createElement("div");
        const parrafo = document.createElement('p');

        contenedor.classList.add('contenedorDepu');
        console.log(contenedor.classList);
        parrafo.textContent = 'FUck U Skrillex';
        contenedor.appendChild(parrafo);

        document.body.appendChild(contenedor);
        //parrafo.innerHTML = info; 
    }
    */

    function desactivarDepurador(){

    }

    

    return {
        activarDepurador,
        desactivarDepurador
    };
})();

$depurador.activarDepurador();