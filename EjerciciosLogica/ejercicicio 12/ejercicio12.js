

let num = parseInt(prompt("Adivina un numero aleatorio de 1-100"));

function juego(num) {
    const aleatorio = Math.abs(Math.floor(Math.random() * (1 - 100 + 1) * 1));
    console.log('aleatorio: ' + aleatorio);

    for(let i = 1; i < 5; ++i){
        if (num == aleatorio) {
            alert('Has ganado');
            return;
        }else if(num < aleatorio){
            num = parseInt(prompt('Mayor. \nIntento: ' + i));
        }else if(num > aleatorio){
            num = parseInt(prompt('Menor. \nIntento: ' + i));
        }
    }
    alert('El numero secreto es: ' + aleatorio);
}

juego(num);