'use strict';

let lados = 0;
// sin terminar 
function rect (lados){
    let resultado = [];

    for (let i = 1; i <= lados; ++i){
        let fila = '';
        for (let j = 1; j <= lados - i; ++j){
            fila += ' ';
        }
        for (let k = 1; k < (2 * i - 1); ++k){
            fila += '*';
        }

        resultado[i] = fila + '* ';
    }
    return resultado;
}


lados = parseInt(prompt('Longitud :'));

let res = rect(lados);
//alert(res.join('\n'));
console.log(res.join('\n'));