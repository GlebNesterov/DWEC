'use strict';

let texto = prompt('Escribe una palabra');

function contadorDeLetras(texto) {
    let toLow = texto.toLowerCase();
    const conteo = {};
    for (let letra of toLow) {
        let res;
        if (letra === ' ') {
            continue;
        }   
        conteo[letra] = (conteo[letra] || 0) + 1;
    }
    return conteo;
}

console.log(contadorDeLetras(texto));

