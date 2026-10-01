'use strict'

let min = parseInt(prompt('mínimo del rango'));

let max = parseInt(prompt('máximo del rango'));

function multiplo (min, max){
    let mult3 = [];
    let mult5 = [];
    let primo = [];
    for (min; min <= max; ++min) {
        if((min % 3) === 0){
            mult3.push(min);
        }
        if((min % 5) === 0){
            mult5.push(min);
        }
        if(min === 2){
            primo.push(min);
        }
        if(min % min == 0 && (min + 1) % min == 1){
            primo.push(min);
        }
        console.log('Múltiplos de 3' , mult3);
        console.log('Múltiplos de 5' , mult5);
        console.log('Primos' , primo);
    }

    multiplo(min, max);

}