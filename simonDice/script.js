'use strict';

const verde = document.querySelector('.verde');
const rojo = document.querySelector('.rojo');
const azul = document.querySelector('.azul');
const amarillo = document.querySelector('.amarillo');

console.log(randomCol);

let ronda = 1;


const simon = (function (){


    // variables 
    const colores = ['verde', 'azul', 'amarillo', 'rojo'];
    let estado = false;
    

    // simplemente secuencia de colores
    function secuenciaDeColores(){
        let secuencia = [];
        secuencia.push(generarColor());
        return secuencia;
    }


    // sacar un color random
    function generarColor(){
        return Math.floor(Math.random() * colores.length);
    }


    // estado de juego
    function estadoDeJuego(estado){
        return estado == true ? 'jugando' : 'parado'; 
    }

    function ultimoColorPulsado(color){
        if(estadoDeJuego(estado) == 'parado'){
            return;
        }


    }



})();