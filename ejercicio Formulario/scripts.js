
'use strict';

const formulario = document.getElementById('formulario');

const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const pass = document.getElementById('password');
pass.setAttribute('type', 'password');
const confirmarPass = document.getElementById('confirmPassword');
const fechaNacimiento = document.getElementById('fechaNacimiento');
fechaNacimiento.setAttribute('type', 'date');
const telefono = document.getElementById('telefono');
const genero = document.getElementById('genero');
const check = document.getElementById('terminos');

const btnRegistrarse = document.getElementById('registrarse');
const resultado = document.getElementById('resultado');

function mensajeError(mensaje, id) {
    document.getElementById(id).textContent = mensaje;
}

function validarNombre() {

    nombre.addEventListener('input', () => {

        if (!nombre.checkValidity()) {
            mensajeError('El nombre es incorrecto', 'errNom');
        } else {
            mensajeError('', 'errNom');
        }
    });

}

validarNombre();

function validarCorreo() {

    email.addEventListener('input', () => {

        if (!email.checkValidity()) {
            mensajeError('El correo introducido es incorrecto', 'errEmail');
        } else {
            mensajeError('', 'errEmail');
        }

    })

}

validarCorreo();

function validarContrasena() {
    pass.addEventListener('input', ()=>{
        if (!pass.checkValidity()) {
            mensajeError('La contraseña tiene que tener al menos 5 caracteres', 'errPass')
        }else{
            mensajeError('', 'errPass');
        }
    })

    confirmarPass.addEventListener('input', () => {

        if (confirmarPass.value !== pass.value) {
            mensajeError('Las contraseñas no coinciden', 'errPass2');
        } else {
            mensajeError('', 'errPass2');
        }


    });
}

validarContrasena();

/*
let hoy = new Date();
 
let nac = new Date('2006 08 05');

console.log(nac.getFullYear());
console.log(hoy.getFullYear());
console.log(Math.abs(nac.getFullYear() - hoy.getFullYear()));
*/

function validarFechaNacimiento() {

    fecha.addEventListener('input', () => {

        let hoy = new Date();


    });


}

function validarGenero() {



}

function validarCheck() {

    check.addEventListener('input', () => {
        if (!check.checkValidity()) {
            mensajeError('Debes seleccionar la casilla', 'errTerm');
        } else {
            mensajeError('', 'errTerm');
        }

    });

}

//validarCheck();




