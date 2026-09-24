'use strict';

let lados = 0;
// sin terminar 
function rect (lados){
    let resultado = [];

    for (let i = 0; i <= lados; ++i){
        let fila = '';
        for (let j = 0; j <= i; ++j){
            if(i === 0 || i === lados - 1 || j === 0 || j === lados - 1){
                fila += '*';
            }else{
                fila += ' ';
            }
        }
        resultado[i] = fila + '*';
    }
    return resultado;
}


lados = parseInt(prompt('Longitud :'));

let res = rect(lados);
//alert(res.join('\n'));
console.log(res.join('\n'));