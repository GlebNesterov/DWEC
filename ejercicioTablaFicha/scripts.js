'use strict';
import Alumno from "./Alumno.js";  

const datos = [
    {
        nombre: "Ana López",
        dni: "12345678A",
        curso: "2º Desarrollo Web",
        asignaturas: ["HTML", "CSS", "JavaScript", "React"],
        telefono: "600123456",
        email: "ana.lopez@example.com"
    },
    {
        nombre: "Carlos Martínez",
        dni: "23456789B",
        curso: "1º Administración de Sistemas",
        asignaturas: ["Linux", "Redes", "Hardware"],
        telefono: "650987654",
        email: "carlos.martinez@example.com"
    },
    {
        nombre: "Laura Sánchez",
        dni: "34567890C",
        curso: "3º Diseño Gráfico",
        asignaturas: ["Photoshop", "Illustrator", "UX Design"],
        telefono: "620111222",
        email: "laura.sanchez@example.com"
    },
    {
        nombre: "Mario Gómez",
        dni: "45678901D",
        curso: "1º Inteligencia Artificial",
        asignaturas: ["Python", "Machine Learning", "Data Science"],
        telefono: "670555444",
        email: "mario.gomez@example.com"
    }
];

let alumnos = [];
alumnos = datos.map(d => new Alumno(d.nombre, d.dni, d.curso, d.asignaturas, d.telefono, d.email));
//console.log(alumnos);

function crearTabla(alumnos){
    const tabla = document.createElement('div');
    tabla.classList.add('tabla');

    const cabecera = document.createElement('div');
    tabla.classList.add('tabla-fila', 'tabla-cabecera');

    const camposCabecera = `<div>Nombre</div><div>Curso</div><div>Telefono</div><div>Email</div>`;
    cabecera.innerHTML = camposCabecera;

    const filas = document.createElement('div');
    filas.classList.add('tabla-fila');


    alumnos.forEach(a => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <div>${a.nombre}</div>
            <div>${a.curso}</div>
            <div>${a.telefono}</div>
            <div>${a.email}</div>
        `;

        filas.appendChild(fila);
    });
    
    tabla.appendChild(cabecera);
    tabla.appendChild(filas);

    document.body.append(tabla);
}

crearTabla(alumnos);

/*
        generarHTMLListado(listaJuguetes) {
        const filas = listaJuguetes.map(j => `
            <div class="tabla-fila">
                    <div>${j.nombre}</div>
                    <div>${j.marca}</div>
                    <div>${j.precio}</div>
                    <div>
                        <button data-accion="ver" data-id="${j.jugueteId}">Ver</button>
                        <button data-accion="borrar" data-id="${j.jugueteId}">Borrar</button>
                    </div>
            </div>`).join("");

        return `
            <div data-componente="listado" class="jg-tabla">
                <div class="tabla-fila cabecera">
                    <div>Nombre</div><div>Marca</div><div>Precio</div><div>Acciones</div>
                </div>
                ${filas}
                <button data-accion="nuevo">Nuevo juguete</button>
            </div>
            `;
    }

*/

