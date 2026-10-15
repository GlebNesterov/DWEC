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

const persona = {
    nombre: 'Jhon',
    nacimiento: '19-06-2006',
    hobbies: ['cantar', 'bailar', 'caminar']
};

class Persona {
    constructor(nombre, nacimiento, hobbies){
        this.nombre = nombre;
        this.nacimiento = nacimiento;
        this.hobbies = hobbies;
    }
    

    get edad(){
        let hoy = Date.now();
        let edad = hoy - this.nacimiento;
        return edad;
    }

    saluda(){
        return `Hola me llamo ${this.nombre} y me gusta ${this.hobbies.join(', ')}`;
    }
}