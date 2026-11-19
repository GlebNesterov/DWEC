'use strict';
//import NodoInspector from "../src/nodoInspector.js";
import { creaPanel } from "./presentacion.js";
let panelPintado = false;
const elementos = document.querySelector('*');

const $depurador = (function (){
    function activarDepurador(){
        creaPanel();
        panelPintado = true;
    }

    function desactivarDepurador(){

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