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


function crearTabla(alumnos) {
    const tabla = document.createElement('div');
    tabla.classList.add('tabla');

    const cabecera = document.createElement('div');
    cabecera.classList.add('tabla-fila', 'tabla-cabecera');

    const camposCabecera = `
        <div>Nombre</div>
        <div>Curso</div>
        <div>Telefono</div>
        <div>Email</div>
    `;

    cabecera.innerHTML = camposCabecera;

    const filas = document.createElement('div');

    alumnos.forEach(a => {
        const fila = document.createElement('div');
        fila.classList.add('tabla-fila');

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

function crearFichas(alumnos){
    for (const a of alumnos) {
        const ficha = document.createElement('div');
        ficha.classList.add('ficha');

        let asignat = alumnos.map(a => `
            <ul>
                ${a.asignaturas.map(as => 
                        `<li>
                            ${as}
                        </li>`
                    )}
            </ul>
        `
        );


        ficha.innerHTML = `
            <div>${a.nombre}</div>
            <div>${a.nombre}</div>
            <div>${a.curso}</div>
            <div>${asignat}</div>
            <div>${a.telefono}</div>
            <div>${a.email}</div>
        `;

        document.body.append(ficha);
    }
}

crearFichas(alumnos);
//crearTabla(alumnos);
