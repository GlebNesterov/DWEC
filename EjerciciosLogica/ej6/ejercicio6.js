
let altura = 0;

/**
 * 
 * @param {*} altura 
 * @returns 
 */
function cuadrado(altura){
    let resultado = [];

    for (let i = 0; i < altura; i++){
        let fila = '';
        for (let j = 0; j < altura; j++){
            if(i === 0 || i === altura - 1 || j === 0 || j === altura - 1){
                fila += '*';
            }else{
                fila += ' ';
            }
        }
        resultado[i] = fila;
    }
    return resultado;
}

/**
 * 
 * @param {*} altura 
 * @returns 
 */
function triangulo(altura){
    let resultado = [];

    for (let i = 1; i <= altura; ++i){
        let fila = '';

        for (let j = 1; j <= altura - i; ++j){
            fila += ' ';
        }
        for (let k = 1; k < (2 * i - 1); ++k){
            fila += '*';
        }

        resultado[i] = fila + '* ';
    }
    return resultado;
}

function geo(altura){

}

// figura rombo 
/**
 * 
 * @param {*} altura 
 */
function rombo(altura){

}

function dibujarFigura(){
    let altura;
    if(leeorOp() === 'T'){
        altura = parseInt(prompt('Indica la altura de la figura: '));
        let res = triangulo(altura);

        console.log(res.join('\n'));
    } else if(leerOp() === 'C'){
        altura = parseInt(prompt('Indica la altura de la figura: '));
        let res = cuadrado(altura);

        console.log(res.join('\n'));
    }else if(leerOp() === 'R'){
        altura = parseInt(prompt('Indica la altura de la figura: '));
        let res = rombo(altura);

        console.log(res.join('\n'));
    }
    
}

let op = 0;
// leer y validar opcion
/**
 * 
 * @param {*} op 
 * @returns 
 */
function leerOp(){
    let op;
    while(true){
        op = prompt('C. Cuadrado\n T. Triangulo\n R. Rombo\n S. Salir');
        validarOp(op);
        return op;
    }
}

function validarOp(op){
    if (op !== 'T' || op !== 'C' || op !== 'R' || op !== 'S') {
            alert('La opción tiene que ser \'T\', \'C\', \'R\' o \'S\'');
    }
    return op;
}

// menu con opciones
function menu(){
    while (true){
        switch(leerOp()){
            case 'S' : return;
            case 'C' : dibujarFigura(leerOp);
            case 'T' : dibujarFigura(leerOp);
            case 'R' : dibujarFigura(leerOp);
        }
    }
}

menu();



    

