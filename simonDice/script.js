'use strict';

let ronda = 1;
/*


La lógica del juego se define en una función autoinvocada denominada
“simon”. Que expone las siguientes características:
o Un método para obtener el array con la secuencia de colores de la
iteración actual.
    o Un método para establecer el último color pulsado. Recibe el color
        pulsado.
    o Un método para obtener la mejor racha.
    o Un método para obtener la posición a comprobar de la racha actual.
    o Un método para iniciar el juego.
    o Un método para obtener el estado del juego, posibles valores:
        “parado” y “jugando”.
*/

const simon = (function (){


    // variables 
    let secuencia = [];
    const colores = ['verde', 'azul', 'amarillo', 'rojo'];
    let estado = false;
    let colorPulsado = 0;
    let posicionActual = 0;
    let mejorRacha = 0;
    let racha = 0;


    // simplemente secuencia de colores
    function secuenciaDeColores(){
        return secuencia;
    }

    // sacar un color random
    function generarColor(){
        return Math.floor(Math.random() * colores.length);
    }


    // actualizar mejor racha si ya es mayor de la que estaba
    function actualizarMejorRacha(racha) {
        if(racha > mejorRacha){
            mejorRacha = racha;
        }
        return mejorRacha;
    }

    function obtenerRachaActual() {
        return rachaActual;
    }


    function addColor(){
        secuencia.push(generarColor());
    }

    function iniciar() {
        if(estado === false){
            estado = true;
            secuencia = [];
            posicionActual = 0;
            racha = 0;
            addColor();

            return 'jugando';
        }
        return 'El juego ya esta iniciado';
    }


    // estado de juego
    function estadoDeJuego(estado){
        return estado == true ? 'jugando' : 'parado'; 
    }

    function obtenerPosicion() {
        return posicionActual;
    }


    //Un método para establecer el último color pulsado. Recibe el color pulsado.
    function ultimoColorPulsado(colorPulsado) {
        if (estado === false) {
            return 'parado';
        }

        if (colorPulsado === secuencia[posicionActual]) {
            posicionActual++;

            if (posicionActual === secuencia.length) {
                racha++;

                if (racha > mejorRacha) {
                    mejorRacha = racha;
                }

                posicionActual = 0;
                addColor();

                return 'ronda completada';
            }

            return 'acierto';

        } else {
            estado = false;
            posicionActual = 0;
            racha = 0;

            return 'fallo';
        }
    }

    return {
        secuenciaDeColores,
        actualizarMejorRacha,
        obtenerRachaActual,
        ultimoColorPulsado,
        obtenerPosicion,
        iniciar,
        estadoDeJuego
    };

})();


const start = document.querySelector('.start');
const milisegundos = document.querySelector('input[nam=milisegundos]');

const mejorRacha = document.querySelector('#mejorRacha');
const racha = document.querySelector('#rachaActual');

const botones = [
    document.querySelector('.verde'),
    document.querySelector('.azul'),
    document.querySelector('.amarillo'),
    document.querySelector('.rojo')
];

function iluminarColor(num){
    botones[num].classList.add('activo');

    setTimeout(function (){
        botones[num].classList.remove('activo');
    }, Number(milisegundos.value) || 500);
}


start.addEventListener('click', () =>{
    simon.iniciar();

    const secuencia = simon.secuenciaDeColores();

    iluminarColor(secuencia[0]);

    mejorRacha.textContent = simon.actualizarMejorRacha();
    racha.textContent = simon.obtenerRachaActua();
});