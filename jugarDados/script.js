/*
    Crea un closure llamado "jugarDados" que reciba como parámetro el número de lados de
    los dados ("numeroLados").
    Este closure deberá definir internamente una función que devuelva un valor aleatorio
    entre 1 y el número de lados indicado.
    Luego, el closure deberá devolver una función anónima que simule la tirada de dos dados,
    devolviendo un array con ambos resultados.
    A continuación, escribe un script para probar el closure que:
        1. Solicite al usuario el número de lados de los dados y el número de tiradas mediante
        prompts.
        
        3. Realice la cantidad de tiradas indicada, comparando los resultados de la máquina y el
        jugador.
        4. Muestra cada resultado individual y, al final, el número total de victorias de cada uno
        mediante alerts.
    Una vez comprobado el código crea una página HTML que te permita jugar una partida de
    dados contra la máquina. Debe gestionar al menos el número de lados del dado, el
    número de tiradas de la partida, los resultados intermedios de las tiradas y el total de
    cada jugador. El jugador humano deberá pulsar un botón cada vez que quiera tirar.
    Organiza el código adecuadamente.

*/
'use strict';

function jugarDados(numeroLados) {
    return function () {
        Math.floor(Math.random() * numeroLados);
    }
}

console.log(jugarDados(4));
