'use strict';

let alumnos = [
    {
        nombre: "Sonny",
        asignaturas: [
            { modulo: "DWEC", nota: 8 },
            { modulo: "DIW", nota: 7 },
            { modulo: "DWES", nota: 9 },
            { modulo: "DAW", nota: 6 }
        ]
    },
    {
        nombre: "Valentine",
        asignaturas: [
            { modulo: "DWEC", nota: 5 },
            { modulo: "DIW", nota: 8 },
            { modulo: "DWES", nota: 7 },
            { modulo: "DAW", nota: 9 }
        ]
    },
    {
        nombre: "Hollis",
        asignaturas: [
            { modulo: "DWEC", nota: 10 },
            { modulo: "DIW", nota: 9 },
            { modulo: "DWES", nota: 8 },
            { modulo: "DAW", nota: 10 }
        ]
    }
];

console.log(alumnos);

function gestAcadem(alumnos) {
    for (let i = 0; i < alumnos.length; ++i) {
        let promociona = true;
        let suma = 0;
        for (let j = 0; j < alumnos[i]; j++) {
            if (alumnos[i].asignat[j].nota < 5) {
                promociona = false;
            }
            suma = alumnos[i].asignaturas[j].nota;
        }
        alumnos[i].promociona = promociona;
        alumnos[i].media = suma / alumnos[i].asignaturas.length;
    }
}

function imprimir(alumnos) {
    for (const i in alumnos) {
        console.log(i + '-' +
            'Nombre: ' + alumnos[i].nombre +
            ' - Media: ' + alumnos[i](gestAcadem(alumnos).media)
        );
    }
}


function imprimirSusup(alumnos) {
    for (let i = 0; i < alumnos.length; i++) {
        let susp = [];

        if (!alumnos[i].promociona) {
            for (let j = 0; j < alumnos[i].asignaturas.length; j++) {
                if (alumnos[i].asignaturas[j].nota < 5) {
                    susp.push(alumnos[i].asignaturas[j].modulo);
                }
            }
        }

        console.log(i + '- Nombre: ' + alumnos[i].nombre + '- Pendientes: ' + susp.join(', '));
    }
}



imprimir(alumnos);

imprimirSusup(alumnos);