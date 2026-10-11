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
        let estado = 'parado';
        let posicionActual = 0;
        let mejorRacha = 0;
        let racha = 0;


        // simplemente secuencia de colores
        function secuenciaDeColores(){
            return [...secuencia];
        }

        // sacar un color random
        function generarColor(){
            return Math.floor(Math.random() * colores.length);
        }

        function obtenerRachaActual() {
            return racha;
        }

        function obtenerMejorRacha() {
            return mejorRacha;
        }

        function addColor(){
            secuencia.push(generarColor());
        }

        function iniciar() {
            estado = 'jugando';
            secuencia = [];
            posicionActual = 0;
            racha = 1;
            addColor();

        }

        // estado de juego
        function estadoDeJuego(){
            return estado;
        }

        function obtenerPosicion() {
            return posicionActual;
        }


        //Un método para establecer el último color pulsado. Recibe el color pulsado.
        function ultimoColorPulsado(colorPulsado) {
            if(estado === 'parado'){
                return;
            }
            if(colorPulsado !== secuencia[posicionActual]){
                estado = 'parado';
                return 'fallo';
            }
            posicionActual++;
            if(posicionActual === secuencia.length){
                racha++;
                if(racha > mejorRacha){
                    mejorRacha = racha;
                }
                posicionActual = 0;
                addColor();
                return 'ronda completada';
            }
            return 'acierto';
        }

        return {
            secuenciaDeColores,
            obtenerRachaActual,
            obtenerMejorRacha,
            ultimoColorPulsado,
            obtenerPosicion,
            iniciar,
            estadoDeJuego
        };

    })();

/*
    // pruba 1
    console.log('comprobacion1: ' , simon.iniciar());
    console.log('comprobacion2: ' , simon.secuenciaDeColores());
    console.log('comprobacion4: ' , simon.ultimoColorPulsado(2));
    console.log('comprobacion5: ' , simon.secuenciaDeColores());
    console.log("comprobacion6: ", simon.ultimoColorPulsado(3));
    console.log('comprobacion7: ', simon.estadoDeJuego());


    // prueba 2
    console.log('iniciar: ' , simon.iniciar());
    console.log('ultimo color: ', simon.ultimoColorPulsado(simon.secuenciaDeColores()[0]));
    console.log('secuencia de colores: ', simon.secuenciaDeColores());

    //pruba 3
    console.log('1 iniciar: ', simon.iniciar());
    console.log('2 estado: ', simon.estadoDeJuego());
    console.log('3 ultimo color pulsado: ', simon.ultimoColorPulsado(simon.secuenciaDeColores()[0]));
    console.log('4 secuencia de colores: ', simon.secuenciaDeColores());
    console.log('5 mejor racha: ', simon.obtenerMejorRacha());
    console.log('6 ultimo color pulsado: ', simon.ultimoColorPulsado(simon.secuenciaDeColores()[-1]));
    console.log('7 estado: ', simon.estadoDeJuego());
    console.log('8 mejor racha: ', simon.obtenerMejorRacha());
*/




const start = document.querySelector('.start');
const milisegundos = document.querySelector('input[name=milisegundos]');

const mejorRacha = document.querySelector('#mejorRacha');
const racha = document.querySelector('#rachaActual');

let mostrando = false;

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

function apagarLuces(){
    botones.forEach(function (boton){
        boton.classList.remove('activo');
    });
}

function presentarSecuencia() {
    mostrando = true;
    const secuencia = simon.secuenciaDeColores();

    function presentarColor(indice) {
        // console.log("indice", indice, "mostrando", mostrando);
        const tiempo = Number(milisegundos.value) || 500;

        if (indice === secuencia.length) {
            apagarLuces();
            mostrando = false;
            return;
        }
        apagarLuces();

        setTimeout(() => {
            botones[secuencia[indice]].classList.add("activo");

            setTimeout(() => {
                presentarColor(indice + 1);
            }, tiempo) ;

        }, tiempo);
    }
    presentarColor(0);
}

start.addEventListener('click', () =>{
    if (simon.estadoDeJuego() === 'jugando') {
        return;
    }

    simon.iniciar();

    

    mejorRacha.textContent = simon.obtenerMejorRacha();
    racha.textContent = simon.obtenerRachaActual();

    presentarSecuencia();
});

/*
document.getElementById('verde').addEventListener('click', ()=>{
    console.log('div clicked');
});
*/
