'use strict'

// const arOp = ['+', '-', '*', '/'];


function problemas() {

    let acertadas = 0;
    let falladas = 0;

    let res = 0;

    let salirOp = false;
    while (!salirOp){
        let arOpNum = Math.floor(Math.random() * (5 - 0 + 1) * 1);
        console.log(arOpNum);
        let num1 = Math.floor(Math.random() * (10 - 1 + 1) * 1);
        let num2 = Math.floor(Math.random() * (10 - 1 + 1) * 1);

        
        switch (arOpNum) {
            case 1 : 
                res = parseInt(prompt(num1 + ' + ' + num2));
                if(res == (num1 + num2)){
                    alert("Correcto");
                    ++acertadas;
                }else{
                    alert('Incorrecto, suma correcta: ' + (num1 + num2));
                    ++falladas;
                }
                break;
            case 2 : 
                res = parseInt(prompt(num1 + ' - ' + num2));
                if(res == (num1 - num2)){
                    alert("Correcto");
                    ++acertadas;
                }else{
                    alert('Incorrecto, resta correcta: ' + (num1 - num2));
                    ++falladas;
                }
                break;
            case 3 : 
                res = parseInt(prompt(num1 + ' * ' + num2));
                if(res == (num1 * num2)){
                    alert("Correcto");
                    ++acertadas;
                }else{
                    alert('Incorrecto, multiplicacion correcta: ' + (num1 * num2));
                    ++falladas;
                }
                break;
            case 4 : 
                res = parseInt(prompt(num1 + ' / ' + num2));
                if(res == (num1 / num2)){
                    alert("Correcto");
                    ++acertadas;
                }else{
                    alert('Incorrecto, division correcta: ' + (num1 / num2));
                    ++falladas;
                }
                break;
        }
        let salir = prompt('Desea salir? s/n');
        if(salir == 's' || salir == 'S'){
            salirOp = true;
        }
    }
    alert('Total preguntas: ' + (acertadas + falladas) + '\n'
         + 'Total aciertos: ' + acertadas + '\n'
         + 'Total falladas: ' + falladas + '\n'
        );
}


problemas();