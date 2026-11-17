'use strict';
import NodoInspector from "../src/nodoInspector.js";

const $depurador = (function (){
    const inspector = new NodoInspector();
    let zonaInfo = null;

    function activarDepurador(){
        panel();
    }

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

    function desactivarDepurador(){

    }

    return {
        activarDepurador,
        desactivarDepurador
    };
})();

$depurador.activarDepurador();