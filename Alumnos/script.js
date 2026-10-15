/*
A partir de un array de objetos JSON de tipo alumno (nombre, nota, modulo,
convocatorias), vamos a crear funciones para trabajar con JSON y arrays.
Formato de los datos:
• Propiedad nota debe estar en el rango de 0-10.
• Propiedad convocatorias debe estar en el rango de 1-4.
• Los nombres de los módulos son DWEC y DWES.
• Incluye 5 o 6 datos de prueba
1. Lista de alumnos suspensos: Crea una función que devuelva un array de JSON con los
alumnos que han suspendido (nota inferior a 5). El resultado debe incluir únicamente el
nombre, la nota y el módulo del alumno, y debe estar ordenado alfabéticamente por el
nombre del alumno.
2. Estadísticas por módulo: Crea una función que devuelva un array de JSON con el
nombre del módulo, la nota media y el número de convocatorias medio por módulo. El
2
resultado debe estar ordenado por el número de convocatorias medio en orden
descendente. Para calcular estas estadísticas:
- Primero, crea un objeto que agrupe los módulos y acumule las notas,
convocatorias y cantidad de alumnos por módulo.
- Luego, recorre los datos agrupados para calcular la nota media y las
convocatorias medias, truncando a dos decimales.
3. Función para devolver los datos en formato JSON: Implementa una función que
devuelva la cadena JSON con todos los datos de los alumnos.
4. Función para cargar una nueva cadena JSON: Implementa una función que permita
cargar una nueva cadena JSON. Utiliza un bloque `try-catch` para gestionar posibles
errores durante el parseo del JSON. Si la cadena no es válida o no es un array, muestra un
mensaje de error adecuado. Puedes comprobar si un objeto es un array con
Array.isArray(objeto).
Todo lo anterior debe estar contenido en una función autoinvocada y asociada a una
constante denominada $yedra.
Crea una página HTML que permita probar la funcionalidad requerida.
Organiza el código adecuadamente.
*/

'use strict';   

let alumnos = [
    {
        nombre: 'marcos', nota: 4.5, modulo : 'DWEC', convocatorias: 1
    },
    {
        nombre: 'ivan', nota: 3.4, modulo : 'DWES', convocatorias: 3
    },
    {
        nombre: 'daniel', nota: 10, modulo : 'DWES', convocatorias: 4
    },
    {
        nombre: 'louise', nota: 7.5, modulo : 'DWEC', convocatorias: 3
    },
    {
        nombre: 'jane', nota: 8.5, modulo : 'DWES', convocatorias: 1
    }
]

function sacarSuspensos(alumnos) {
    let suspensos = [];
    for (let alumno of alumnos) {
        if(alumno.nota < 5){
            suspensos.push({
                nombre: alumno.nombre,
                nota : alumno.nota,
                modulos: alumno.modulo
            });
        }
    }
    return suspensos.sort((a,b) => a.nombre - b.nombre);
}

console.log(sacarSuspensos(alumnos));

function estadisticaModulos(alumnos) {
    let aux = {};
    let aux2 = [];

    for (let alumno of alumnos) {

        if(alumno.modulo in aux){
            let modulo = aux[alumno.modulo];
            modulo.total++;
            modulo.notaAgr += alumno.nota;
            modulo.nota += alumno.convocatorias;
        }else{
            aux[alumno.modulo] = {
                total:1,
                notaAgr: alumno.nota,
                convocatorias: alumno.convocatorias
            }
        }
        
    }

    for (const au in aux) {
        aux2.push({
            modulo: au,
            media: aux[au].media = aux[au].notaAgr / aux[au].total,
            mediaConvocatorias: aux[au].mediaConvocatorias = aux[au].convocatorias / aux[au].convocatorias
        });
    }
    return aux2;
}

console.log(estadisticaModulos(alumnos));

function JSONFormatter (){
    return JSON.stringify(alumnos);
}


function JSONCadena(cadena) {
    try{
        let datos = JSON.parse(cadena);
        if(!Array.isArray(datos)){
            console.log('No es un array');
            return; 
        }
        return datos;
    }catch(error){
        console.log('error de formato');
        return;
    }
}