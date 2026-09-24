'use strict';

let array = [];
let num = -1;
let contador = 0;
let max = 0;
let min = 0;
let media = 0;

do{
    num = parseInt(prompt('Introduce un número (0 para salir):'));
    if(max == null ||num > max){
        max = num;
    }else if(min == null || num < max){
        min = num;
    }
    let sum = 0;
    sum += num;
    media = sum / contador
    
    ++contador;
    alert('maximo: ' + max);
    alert('minimo: ' + min);
    alert('numeros introducidos: ' + contador);
    alert('media: ' + media);   

}while(num != 0);
