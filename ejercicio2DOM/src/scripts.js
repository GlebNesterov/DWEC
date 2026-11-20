'use strict';
//import NodoInspector from "../src/nodoInspector.js";
import { creaPanel } from "./presentacion.js";
let panelPintado = false;
let panel = null;


const $depurador = (function (){
    function activarDepurador(){
        if(panel === null) panel = creaPanel();
        panel.style.display = '';
        panelPintado = true;    
    }

    function desactivarDepurador(){
        if(panelPintado){
            panelPintado = false;
            panel.style.display = 'none';
        }
    }

    return {
        activarDepurador,
        desactivarDepurador
    };
})();

window.addEventListener('load', ()=>{
    window.addEventListener('click' ,()=>{
        if (!panelPintado) $depurador.activarDepurador();
    })
});