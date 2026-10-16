'use strict';

class Animal {
    constructor(tipo, nombre){
        this.tipo = tipo;
        this.nombre = nombre;
    }

    comer(){
        return `${this.nombre} es ${this.tipo} y él esta comiendo`;
    }

    dormir(){
        return `${this.nombre} es ${this.tipo} y él esta durmiendo`;
    }

    hacerRuido(){

            return this.nombre + ' hace ruidos desconocidos';
    }

    get tipoAnimal(){
        return this.tipo;
    }
}

class Perro extends Animal{
    hacerRuido(){
        return this.nombre + ' hace guau';
    }
}

class Gato extends Animal{
    constructor(tipo, nombre){
        super(tipo, nombre);
    }
    hacerRuido(){
        return this.nombre + ' hace miau';
    }
}

const perro = new Perro('perro', 'Joe');
console.log(perro.tipoAnimal);
console.log(perro.hacerRuido());
console.log(perro.comer());
console.log(perro.dormir());

const gato = new Gato('gato', 'Brian');
console.log(gato.tipoAnimal);
console.log(gato.hacerRuido());
console.log(gato.comer());
console.log(gato.dormir());

const animal = new Animal('pajaro', 'ZibZib');
console.log(animal.tipoAnimal);
console.log(animal.hacerRuido());
console.log(animal.comer());
console.log(animal.dormir());


//Object.setPrototypeOf(animal, Animal);

//console.log(Object.getPrototypeOf(animal));