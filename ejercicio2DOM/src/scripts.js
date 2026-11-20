'use strict';
//import NodoInspector from "../src/nodoInspector.js";
import { creaPanel } from "./presentacion.js";
let panelPintado = false;
let panel = null;


const $depurador = (function (){
    function activarDepurador(){
        if(panel === null) panel = creaPanel();
        panel.hidden = false;
        panelPintado = true;    
    }

    function desactivarDepurador(){
        if(panelPintado){
            panelPintado = true;
            panel.hidden = false;
        }
    }

    return {
        activarDepurador,
        desactivarDepurador
    };
})();

window.addEventListener('load', ()=>{
    window.addEventListener('keydown' ,(e)=>{
        if(e.key.toLowerCase('e')){
            e.preventDefault;
            if (!panelPintado) $depurador.activarDepurador();
            else $depurador.desactivarDepurador();
        }
        
    })
});