
'use strict';

// Obtener elementos del formulario
const formulario = document.getElementById('formulario');

const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const pass = document.getElementById('password');
pass.setAttribute('type', 'password');
const confirmarPass = document.getElementById('confirmarPassword');
const fechaNacimiento = document.getElementById('fechaNacimiento');
const telefono = document.getElementById('telefono');
const genero = document.getElementById('genero');
const terminos = document.getElementById('terminos');

const btnRegistrarse = document.getElementById('registrarse');
const resultado = document.getElementById('resultado');


// Función para mostrar mensajes de error
function mensajeError(mensaje, id) {
    document.getElementById(id).textContent = mensaje;
}


// Función para aplicar estilos según la validación
function cambiarEstilo(campo, valido) {
    campo.classList.remove('valido', 'invalido');

    if (valido) {
        campo.classList.add('valido');
    } else {
        campo.classList.add('invalido');
    }
}


function validarNombre() {

    const valor = nombre.value.trim();

    if (valor === '') {
        mensajeError('El nombre no puede estar vacío', 'errNom');
        cambiarEstilo(nombre, false);
        return false;
    }

    if (valor.length < 3) {
        mensajeError('El nombre debe tener al menos 3 caracteres', 'errNom');
        cambiarEstilo(nombre, false);
        return false;
    }

    if (/[0-9]/.test(valor)) {
        mensajeError('El nombre no puede contener números', 'errNom');
        cambiarEstilo(nombre, false);
        return false;
    }

    mensajeError('', 'errNom');
    cambiarEstilo(nombre, true);

    return true;
}

function validarEmail() {

    const valor = email.value.trim();

    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor === '') {
        mensajeError('El correo electrónico es obligatorio', 'errEmail');
        cambiarEstilo(email, false);
        return false;
    }

    if (!patron.test(valor)) {
        mensajeError('Introduce un correo electrónico válido', 'errEmail');
        cambiarEstilo(email, false);
        return false;
    }

    mensajeError('', 'errEmail');
    cambiarEstilo(email, true);

    return true;
}


function validarPass() {

    const valor = pass.value;

    if (valor === '') {
        mensajeError('La contraseña es obligatoria', 'errPass');
        cambiarEstilo(pass, false);
        return false;
    }

    if (valor.length < 8) {
        mensajeError('Debe tener al menos 8 caracteres', 'errPass');
        cambiarEstilo(pass, false);
        return false;
    }

    if (!/[A-Z]/.test(valor)) {
        mensajeError('Debe contener al menos una mayúscula', 'errPass');
        cambiarEstilo(pass, false);
        return false;
    }

    if (!/[0-9]/.test(valor)) {
        mensajeError('Debe contener al menos un número', 'errPass');
        cambiarEstilo(pass, false);
        return false;
    }

    if (!/[^A-Za-z0-9]/.test(valor)) {
        mensajeError('Debe contener al menos un carácter especial', 'errPass');
        cambiarEstilo(pass, false);
        return false;
    }

    mensajeError('', 'errPass');
    cambiarEstilo(pass, true);

    return true;
}


function validarPass2() {

    if (confirmarPass.value === '') {
        mensajeError('Debes confirmar la contraseña', 'errPass2');
        cambiarEstilo(confirmarPass, false);
        return false;
    }

    if (confirmarPass.value !== pass.value) {
        mensajeError('Las contraseñas no coinciden', 'errPass2');
        cambiarEstilo(confirmarPass, false);
        return false;
    }

    mensajeError('', 'errPass2');
    cambiarEstilo(confirmarPass, true);

    return true;
}

function validarFecha() {

    const valor = fechaNacimiento.value;

    if (valor === '') {
        mensajeError('La fecha de nacimiento es obligatoria', 'errFecha');
        cambiarEstilo(fechaNacimiento, false);
        return false;
    }

    const nacimiento = new Date(valor + 'T00:00:00');
    const hoy = new Date();

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (
        mes < 0 ||
        (mes === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
        edad--;
    }

    if (nacimiento > hoy || edad < 16) {
        mensajeError('Debes tener al menos 16 años', 'errFecha');
        cambiarEstilo(fechaNacimiento, false);
        return false;
    }

    mensajeError('', 'errFecha');
    cambiarEstilo(fechaNacimiento, true);

    return true;
}

function validarTel() {

    const valor = telefono.value.trim();

    // El teléfono es opcional
    if (valor === '') {
        mensajeError('', 'errTel');
        cambiarEstilo(telefono, true);
        return true;
    }

    if (!/^[0-9]{9}$/.test(valor)) {
        mensajeError('El teléfono debe contener exactamente 9 dígitos', 'errTel');
        cambiarEstilo(telefono, false);
        return false;
    }

    mensajeError('', 'errTel');
    cambiarEstilo(telefono, true);

    return true;
}

function validarGenero() {

    if (genero.value === '') {
        mensajeError('Debes seleccionar un género', 'errGenero');
        cambiarEstilo(genero, false);
        return false;
    }

    mensajeError('', 'errGenero');
    cambiarEstilo(genero, true);

    return true;
}

function validarTerminos() {

    if (!terminos.checked) {
        mensajeError('Debes aceptar los términos y condiciones', 'errTerminos');
        cambiarEstilo(terminos, false);
        return false;
    }

    mensajeError('', 'errTerminos');
    cambiarEstilo(terminos, true);

    return true;
}

function validarFormulario() {

    const resultados = [
        validarNombre(),
        validarEmail(),
        validarPass(),
        validarPass2(),
        validarFecha(),
        validarTel(),
        validarGenero(),
        validarTerminos()
    ];

    const formularioValido = resultados.every(Boolean);

    btnRegistrarse.disabled = !formularioValido;

    return formularioValido;
}


nombre.addEventListener('input', validarFormulario);
email.addEventListener('input', validarFormulario);
pass.addEventListener('input', () => {
    validarPass();
    validarPass2();
    validarFormulario();
});

confirmarPass.addEventListener('input', validarFormulario);
fechaNacimiento.addEventListener('change', validarFormulario);
telefono.addEventListener('input', validarFormulario);
genero.addEventListener('change', validarFormulario);
terminos.addEventListener('change', validarFormulario);

formulario.addEventListener('submit', (e) => {

    e.preventDefault();

    if (!validarFormulario()) {

        const errores = [];

        document.querySelectorAll('.error').forEach(error => {

            if (error.textContent !== '') {
                errores.push(error.textContent);
            }

        });

        resultado.className = 'resumen-error';

        resultado.textContent =
            'No se puede enviar el formulario. Corrige los siguientes errores:\n\n' +
            errores.map(error => '- ' + error).join('\n');

        return;
    }

    const datos = {
        nombre: nombre.value.trim(),
        email: email.value.trim(),
        password: pass.value,
        confirmarPassword: confirmarPass.value,
        fechaNacimiento: fechaNacimiento.value,
        telefono: telefono.value.trim(),
        genero: genero.value,
        terminos: terminos.checked
    };

    const json = JSON.stringify(datos, null, 2);

    resultado.className = 'exito';

    resultado.textContent =
        '¡Registro realizado correctamente!\n\n' +
        'Datos enviados:\n' + json;

});
