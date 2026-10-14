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

const $ = (id) => document.getElementById(id);

let tirar, totalTirada, tiradaActual, marcador;

function jugarDados(numeroLados) {
    let num = 0;
    
    function aleatorio(){
       return Math.floor(Math.random() * numeroLados + 1);
    }

    return function () {
        let tirada = [aleatorio(), aleatorio()];
        
        return tirada;
    };
}

// codigo de prueba
/*
let usuario = 0;
let maquina = 0;

let numeroLados = parseInt(prompt('Dime el numero de lados'));
let numeroTiradas = parseInt(prompt('Cuantas veces quieres tirar dado'));


if(isNaN(numeroLados) || isNaN(numeroTiradas) || numeroLados < 2 || numeroTiradas < 2){
    alert('Datos invalidos');
}else{
    const tirar = jugarDados(numeroLados);
    let maquinaWin = 0;
    let empate = 0;
    let usuarioWin = 0;

    for(i = 0; i < numeroTiradas; ++i){
        const [usuario, maquina] = tirar();
        let res;

        if(usuario > maquina){
            ++usuarioWin;
            res = 'gana el usario';
        }else if(usuario > maquina){
            ++maquinaWin;
            res = 'gana la maquina';
        }else{
            ++empate;
        }

    }
}
alert(`pts maquina = ${score[0]}, pts usuario = ${score[1]}`);
alert(`El usario ha ganado ${usuarioWin} partidas`);
alert(`El usario ha ganado ${maquinaWin} partidas`);
*/



function reiniciarMarcador(){
    marcador = {ptsUsuario: 0, ptsMaquina: 0, winUsuario: 0, winMaquina: 0, empates: 0};
}

function pintarMarcador() {
    $('ptsUsuario').textContent = marcador.ptsUsuario;
    $('ptsMaquina').textContent = marcador.ptsMaquina;
    $('winUsuario').textContent = marcador.winUsuario;
    $('winMaquina').textContent = marcador.winMaquina;
    $('empates').textContent = `Empates: ${marcador.empates}`;
}

function actualizarEstado(){
    $('estado').textContent = `Tirada ${tiradaActual} de ${totalTirada}`;
}


function empezar(){
    const lados = parseInt($('lados').value);
    totalTirada = parseInt($('tiradas').value);
    
    if(isNaN(lados) || isNaN(totalTirada) || lados < 2 || totalTirada < 1){
        alert('Datos invalidos');
        return;
    }

    tirar = jugarDados(lados);
    tiradaActual = 0;
    reiniciarMarcador();
    pintarMarcador();

    $('resultados').innerHTML = '';
    $('final').innerHTML = '';
    $('partida').hidden = false;
    $('tirar').disabled = false;
    actualizarEstado();
}

function jugarTirada() {
    const [usuario, maquina] = tirar();
    let res;

    ++tiradaActual;

    marcador.ptsUsuario += usuario;
    marcador.ptsMaquina += maquina;

    if(usuario > maquina){
        marcador.winUsuario++;
        res = 'Gana el usario';
    }else if(usuario < maquina){
        marcador.winMaquina++;
        res = 'Gana la maquina';
    }else{
        marcador.empates++;
        res = 'Empate';
    }

    pintarTabla(usuario, maquina, res);
    pintarMarcador();
    actualizarEstado();

    if(tiradaActual === totalTirada){
        terminar();
    }
}

function pintarTabla(usuario, maquina, resultado) {
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${tiradaActual}</td><td>${usuario}</td><td>${maquina}</td><td>${resultado}</td>`;
    $('resultados').appendChild(fila);
}

function terminar() {
    let mensaje;
    $('tirar').disabled = true;

    if(marcador.winUsuario > marcador.winMaquina){
        mensaje = 'Has ganado la partida';
    }else if(marcador.winUsuario < marcador.winMaquina){
        mensaje = 'Maquina ha ganado la partida';
    }else{
        mensaje = 'Empate';
    }
    $('final').textContent = mensaje;
}

$('empezar').addEventListener('click', empezar);
$('tirar').addEventListener('click', jugarTirada);
