/*
A partir de la clase Persona, con la siguiente estructura:
    • Campos: “nombre”, “nacimiento” (fecha) y “hobbies“ (lista de cadenas).
    • Propiedades: “edad” (get), computada a partir de nacimiento.
    • Métodos: “Saludar”, devuelve la cadena “Hola, me llamo NOMBRE y me gusta LISTA_HOBBIES”.
Se pide:
    Define y prueba la clase “Persona” según los 3 formatos de definición de clases
    soportados por JS: objeto literal, función constructora y ES6.
*/

'use strict'

function calcularEdad(nacimiento) {
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const aunNoCumple = hoy.getMonth() < nacimiento.getMonth() || (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());
    if (aunNoCumple) {
        edad--;
    }
    return edad;
}
// persona literal 
const personaLiteral = {
    nombre: 'Jhon',
    nacimiento: new Date(2006, 5, 19),
    hobbies: ['cantar', 'bailar', 'caminar'],

    get edad(){
        return calcularEdad(this.nacimiento);
    },

    saludar(){
        return `Hola me llamo ${this.nombre} y me gusta ${this.hobbies}`;
    }
};
console.log('Persona Literal');
console.log(personaLiteral.saludar());
console.log('Edad: ', personaLiteral.edad);


// Funcion constructora
function PersonaFn(nombre, nacimiento, hobbies) {
    this.nombre = nombre;
    this.nacimiento = nacimiento;
    this.hobbies = hobbies;
}

/*
Object.defineProperty(PersonaFn.prototype, 'edad', {
    get(){
        return calcularEdad(this.nacimiento);
    }
});
*/

// Método en el prototipo (compartido por todas las instancias)
PersonaFn.prototype.saludar = function () {
    return `Hola, me llamo ${this.nombre} y me gusta ${this.hobbies.join(', ')}`;
};

const personaFn = new PersonaFn('Jhon', new Date(2006, 5, 19), ['cantar', 'bailar', 'caminar']);

console.log('Funcion Constructora');
console.log(personaFn.saludar());
console.log('Edad:', personaFn.edad);


// clase ES6
class Persona {
    constructor(nombre, nacimiento, hobbies){
        this.nombre = nombre;
        this.nacimiento = nacimiento;
        this.hobbies = hobbies;
    }

    get edad(){
        return calcularEdad(this.nacimiento);
    }

    saludar(){
        return `Hola me llamo ${this.nombre} y me gusta ${this.hobbies}`;
    }
}

let p = new Persona('Jhon', new Date(2006, 5, 19), ['cantar', 'bailar', 'leer']);
//let p = new Persona(persona.nombre, persona.nacimiento, persona.hobbies);

console.log('Clase ES6');
console.log(p.saludar());
console.log(p.edad);

