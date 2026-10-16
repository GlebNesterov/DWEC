'use strict';

function AnimalPrincipal(tipo, nombre) {
    this.tipo = tipo;
    this.nombre = nombre;
}
Animal.prototype.comer = function () {
    return this.nombre + ' esta comiendo';
};

Animal.prototype.dormir = function () {
    return this.nombre + ' esta durmiendo'
};

Animal.prototype.hacerRuido = function () {
    switch(this.tipo){
        case 'perro':
            return this.nombre + ' hace guau';
        case 'gato':
            return this.nombre + ' hace miau';
        default :
            return this.nombre + ' hace ruidos desconocidos';
    }
};

const animal1 = new AnimalPrincipal('perro', 'Max');

const animal2 = new AnimalPrincipal('gato', 'Ryan');

const animal3 = new AnimalPrincipal('animal', 'Skr');


console.log('Perro: ');
console.log(animal1.comer());
console.log(animal1.dormir());
console.log(animal1.hacerRuido());

console.log('Gato: ');
console.log(animal2.comer());
console.log(animal2.dormir());
console.log(animal2.hacerRuido());

console.log('Animal: ');
console.log(animal3.comer());
console.log(animal3.dormir());
console.log(animal3.hacerRuido());