import Libro from '../classes/libro.js';
import Autor from '../classes/autor.js';
import Biblioteca from '../classes/biblioteca.js';
import datos from '../data/datos.js';
import { esc } from '../classes/utilidades.js';

const $biblio = (function (){
    let libros = [];
    let autores = [];
    let bibliotecas = [];

    let ultimoIdLibro;
    let ultimoIdAutor;
    let ultimoIdBiblioteca;

    // METODOS PRIVADOS
    function procesarLibros(){
        libros = datos.libros.map(d => new Libro(d.libroId, d.titulo, d.ISBN, d.autorId, d.bibliotecaId, d.prestamos));

        ultimoIdLibro = Math.max(0, ...libros.map(d => d.libroid));
    }

    function procesarAutores(){
        autores = datos.autores.map(a => new Autor(a.autorId, a.nombre, a.nacionalidad, a.biografia, a.libros));

        ultimoIdAutor = Math.max(0, ...autores.map(a => a.autorid));
    }

    function procesarBibliotecas(){
        bibliotecas = datos.bibliotecas.map(b => new Biblioteca(b.bibliotecaId, b.nombre, b.ubicacion));

        ultimoIdBiblioteca = Math.max(0, ...bibliotecas.map(b => b.bibliotecaid));
    }

    procesarLibros();
    procesarAutores();
    procesarBibliotecas();

    //console.log(libros, autores, bibliotecas);
    //console.log(ultimoIdLibro, ultimoIdAutor, ultimoIdBiblioteca);

    // GENERAR HTML

    function generarHTMLListadoAutores(){
        const filas = autores.map(a => `
        <tr>
            <td>${esc(a.nombre)}</td>
            <td>${esc(a.nacionalidad)}</td>
            <td>${a.libros.length}</td>
            <td>
                <button class="biblio-autor-ver" data-id="${a.autorid}">Ver</button>
                <button class="biblio-autor-editar" data-id="${a.autorid}">Editar</button>
                <button class="biblio-autor-borrar" data-id="${a.autorid}">Borrar</button>
            </td>
        </tr>`).join('');

        return `
            <section>
                <h2>Autores</h2>
                <button class="biblio-autor-crear">Crear autor</button>
                <table>
                    <thead><tr><th>Nombre</th><th>Nacionalidad</th><th>Libros</th><th>Acciones</th></tr></thead>
                    <tbody>${filas}</tbody>
                </table>
            </section>
        `;
    }

    function generarHTMLListadoBiblioteca(){
        const filas = bibliotecas.map(b => {
        const total = libros.filter(l => l.bibliotecaid === b.bibliotecaid).length;
        return `
        <tr>
            <td>${esc(b.nombre)}</td>
            <td>${esc(b.ubicacion)}</td>
            <td>${total}</td>
            <td>
                <button class="biblio-biblioteca-ver" data-id="${b.bibliotecaid}">Ver</button>
                <button class="biblio-biblioteca-editar" data-id="${b.bibliotecaid}">Editar</button>
                <button class="biblio-biblioteca-borrar" data-id="${b.bibliotecaid}">Borrar</button>
            </td>
        </tr>`;
    }).join('');


        return `
            <section>
                <h2>Bibliotecas</h2>
                <button class="biblio-biblioteca-crear">Crear biblioteca</button>
                <table>
                    <thead><tr><th>Nombre</th><th>Ubicación</th><th>Libros</th><th>Acciones</th></tr></thead>
                    <tbody>${filas}</tbody>
                </table>
            </section>
        `;
    }

    function filaLibro(l, conAcciones = true) {
        const autor = buscarAutor(l.autorid);
        const biblio = buscarBiblioteca(l.bibliotecaid);
        const acciones = conAcciones ? `
            <button class="biblio-libro-ver" data-id="${l.libroid}">Ver</button>
            <button class="biblio-libro-editar" data-id="${l.libroid}">Editar</button>
            <button class="biblio-libro-borrar" data-id="${l.libroid}">Borrar</button>`
            : `<button class="biblio-libro-ver" data-id="${l.libroid}">Ver</button>`;
        return `
            <tr>
                <td>${esc(l.titulo)}</td>
                <td>${esc(l.isbn)}</td>
                <td>${autor ? esc(autor.nombre) : '—'}</td>
                <td>${biblio ? esc(biblio.nombre) : '—'}</td>
                <td>${l.estaDisponible ? 'Disponible' : 'Prestado'}</td>
                <td>${acciones}</td>
            </tr>`;
    }


    function generarHTMLListadoLibros(){
        return `
            <section>
                <h2>Libros</h2>
                <button class="biblio-libro-crear">Crear libro</button>
                <table>${cabeceraLibros}<tbody>${libros.map(l => filaLibro(l)).join('')}</tbody></table>
            </section>
        `;
    }

    function generarHTMListadoBuscador(){
        if (resultados.length === 0) {
            return `<section><h2>Resultados</h2><p>No se han encontrado ${tipo}.</p></section>`;
        }

        if (tipo === 'autores') {
            const filas = resultados.map(a => `
                <tr>
                    <td>${esc(a.nombre)}</td>
                    <td>${esc(a.nacionalidad)}</td>
                    <td>${a.libros.map(esc).join(', ')}</td>
                    <td><button class="biblio-autor-ver" data-id="${a.autorid}">Ver</button></td>
                </tr>`).join('');
            return `
                <section>
                    <h2>Autores encontrados (${resultados.length})</h2>
                    <table>
                        <thead><tr><th>Nombre</th><th>Nacionalidad</th><th>Libros</th><th>Acciones</th></tr></thead>
                        <tbody>${filas}</tbody>
                    </table>
                </section>    
            `;
        }

        return `
            <section>
                <h2>Libros encontrados (${resultados.length})</h2>
                <table>${cabeceraLibros}<tbody>${resultados.map(l => filaLibro(l, false)).join('')}</tbody></table>
            </section>`;
    }

    // BUSCAR LIBRO POR NOMBRE O AUTOR

    function buscarLibroPorTitulo(titulo){
        if(!titulo){
            return [...libros];
        }
        return libros.filter(l => l.titulo.toLowerCase().includes(titulo.toLowerCase().trim()));
    }

    function buscarLibroPorAutor(autor){
        if(!autor){
            return [...libros];
        }   
        return autores.filter(a => a.nombre.toLowerCase().includes(autor.toLowerCase().trim()));
    }

    /*
    console.log('Libros:', libros.length, '| último ID:', ultimoIdLibro);       // 12 | 112
    console.log('Autores:', autores.length, '| último ID:', ultimoIdAutor);     // 4 | 4
    console.log('Bibliotecas:', bibliotecas.length, '| último ID:', ultimoIdBiblioteca); // 3 | 3

    
    console.log(buscarLibro(101)?.titulo);       // La Casa de los Espíritus
    console.log(buscarLibro("101")?.titulo);     // igual que el anterior (string)
    console.log(buscarLibro(999));               // undefined
    console.log(buscarAutor(2)?.nombre);         // Mario Vargas Llosa
    console.log(buscarBiblioteca(3)?.nombre);    // Biblioteca del Norte

    console.log(buscarLibroPorTitulo("casa").map(l => l.titulo));   // ["La Casa de los Espíritus"]
    console.log(buscarLibroPorTitulo("  CASA  ").length);           // 1 (trim y mayúsculas)
    console.log(buscarLibroPorTitulo("").length);                   // 12
    console.log(buscarLibroPorTitulo("zzz").length);                // 0
    console.log(buscarLibroPorAutor("isabel").map(a => a.nombre));  // ["Isabel Allende"]
    console.log(buscarLibroPorAutor("").length);                    // 4
    console.log(buscarLibroPorAutor("mexic").length);               // 0 (busca en nombre, no en nacionalidad)
    */

    // BUSCAR POR IDS

    function buscarLibro(id){
        return libros.find(l => l.libroid === Number(id));
    }

    function buscarAutor(id){
        return autores.find(a => a.autorid === Number(id));
    }

    function buscarBiblioteca(id){
        return bibliotecas.find(b => b.bibliotecaid === Number(id));
    }

    // CREACION DE OBJETOS

    function crearLibro(libro){
        let titulo = libro.titulo?.trim();
        let isbn = libro.isbn?.trim();
        let autor = buscarAutor(libro.autorid);
        let biblioteca = buscarBiblioteca(libro.bibliotecaid);
        if(!titulo || !isbn || !autor || !biblioteca){
            return null;
        }
        
        let nuevo = new Libro(++ultimoIdLibro, titulo, isbn, autor.autorid, biblioteca.bibliotecaid, libro.prestamos);

        libros.push(nuevo);
        autor.libros.push(titulo);

        return nuevo;
    }

    function crearAutor(autor){
        let nacionalidad = autor.nacionalidad?.trim();
        let nombre = autor.nombre?.trim();
        let biografia = autor.biografia?.trim();

        
        if(!nombre || !nacionalidad || !biografia){
            return null;
        }
        let nuevo = new Autor(++ultimoIdAutor, nombre, nacionalidad, biografia, autor.libros);

        autores.push(nuevo);
        return nuevo;
    }

    function crearBiblioteca(biblioteca){
        let nombre = biblioteca.nombre?.trim();
        let ubicacion = biblioteca.ubicacion?.trim();

        if(!nombre || !ubicacion){
            return null;
        }

        let nuevo = new Biblioteca(++ultimoIdBiblioteca, nombre, ubicacion);

        bibliotecas.push(nuevo);

        return nuevo;
    }


    /*
    const b = crearBiblioteca({ nombre: 'Biblioteca Sur', ubicacion: 'Calle Sur 1' });
    console.log(b.bibliotecaid, b.nombre);        // 4  Biblioteca Sur
    console.log(bibliotecas.length);              // 4


    const a = crearAutor({ nombre: 'Gabriel García Márquez', nacionalidad: 'Colombiana', biografia: 'Nobel de Literatura' });
    console.log(a.autorid, a.nombre);             // 5  Gabriel García Márquez
    console.log(a.libros);                        // []  (valor por defecto del constructor)
    console.log(autores.length);                  // 5


    const l = crearLibro({ titulo: 'Cien años de soledad', isbn: 'ISBN-0037', autorid: a.autorid, bibliotecaid: b.bibliotecaid });
    console.log(l.libroid, l.titulo);             // 113  Cien años de soledad
    console.log(l.prestamos, l.estaDisponible);   // []  true
    console.log(libros.length);                   // 13


    const l2 = crearLibro({ titulo: 'El amor en los tiempos del cólera', isbn: 'ISBN-0038', autorid: "5", bibliotecaid: "4" });
    console.log(l2.autorid, typeof l2.autorid);   // 5  number


    console.log(buscarLibro(113)?.titulo);                              // Cien años de soledad
    console.log(buscarLibroPorTitulo("soledad").length);                // 1
    console.log(buscarLibroPorAutor("garcía").map(x => x.nombre));     // ["Gabriel García Márquez"]


    console.log(buscarAutor(5).libros);   // ["Cien años de soledad", "El amor en los tiempos del cólera"]

    console.log(crearLibro({ titulo: '', isbn: 'X', autorid: 1, bibliotecaid: 1 }));      // null
    console.log(crearLibro({ titulo: 'Fantasma', isbn: 'X', autorid: 999, bibliotecaid: 1 })); // null
    console.log(libros.length);   // sigue en 14, no cambia
    */

    // BORRAR OBJETOS

    function borrarLibro(id){
        let libro = buscarLibro(id);
        if(!libro){
            return null;
        }

        libros = libros.filter(l => l.libroid !== libro.libroid);
        const autor = buscarAutor(libro.autorid);

        if(autor){
            const pos = autor.libros.indexOf(libro.titulo);
            if(pos !== -1){
                autor.libros.splice(pos, 1);
            }
            return libro;
        }
    }

    /*
    console.log(borrarLibro(999));            // null
    console.log(libros.length);               // 12
    console.log(borrarLibro("101")?.titulo);  // La Casa de los Espíritus
    console.log(libros.length);               // 11
    console.log(buscarAutor(1).libros);       // ["Eva Luna", "El Amante Japonés"]
    console.log(buscarLibroPorTitulo("casa").length); // 0
    console.log(crearLibro({ titulo: 'X', isbn: 'Y', autorid: 1, bibliotecaid: 1 })?.libroid); // 113
    */

    function borrarAutor(id){
        let autor = buscarAutor(id);
        if(!autor){
            return null;
        }
        libros = libros.filter(l => l.autorid !== autor.autorid);
        autores = autores.filter(a => a.autorid !== autor.autorid);

        return autor;
    }

    /*
    console.log(borrarAutor(999));                              // null
    console.log(borrarAutor("1")?.nombre);                      // Isabel Allende (acepta string)
    console.log(autores.length);                                // 3
    console.log(libros.length);                                 // 9
    console.log(libros.filter(l => l.autorid === 1).length);    // 0, sin huérfanos
    console.log(buscarLibroPorTitulo("eva luna").length);       // 0
    console.log(crearAutor({ nombre: 'X', nacionalidad: 'Y', biografia: 'Z' })?.autorid); // 5, el contador no retrocede
    */

    function borrarBiblioteca(id){
        let biblioteca = buscarBiblioteca(id);
        if(!biblioteca){
            return null
        }

        const librosBiblio = libros.filter(l => l.bibliotecaid === biblioteca.bibliotecaid);

        librosBiblio.forEach(l => borrarLibro(l.libroid));
            
        bibliotecas = bibliotecas.filter(b => b.bibliotecaid !== biblioteca.bibliotecaid);

        return biblioteca;
    }

    /*
        console.log(borrarBiblioteca(999));                              // null
        console.log(borrarBiblioteca(1)?.nombre);                        // Biblioteca Central
        console.log(bibliotecas.length);                                 // 2
        console.log(libros.length);                                      // 7
        console.log(libros.filter(l => l.bibliotecaid === 1).length);    // 0
        console.log(buscarAutor(1).libros);                              // ["El Amante Japonés"]
        console.log(crearBiblioteca({ nombre: 'X', ubicacion: 'Y' })?.bibliotecaid); // 4
    */

    // PRESTAMOS

    function crearPrestamo(libro){
        if(!libro || !libro.estaDisponible){
            return null;
        }

        const prestamo = {fechaPrestamo: new Date().toISOString().slice(0, 10)};
        libro.prestamo.push(prestamo);

        return prestamo;
    }

    function devolverPrestamo(libro){
        if(!libro || libro.estaDisponible){
            return null;
        }

        const prestamo = libro.prestamos.find(p => !p.fechaDevolucion);
        prestamo.fechaDevolucion = new Date().toISOString.slice(0,10);

        return prestamo;
    }

    return {
        generarHTMLListadoAutores,
        generarHTMLListadoBiblioteca,
        generarHTMLListadoLibros,
        generarHTMListadoBuscador,
        buscarLibro,
        buscarAutor,
        buscarLibroPorTitulo,
        buscarLibroPorAutor,
        buscarBiblioteca,
        crearLibro,
        crearAutor,
        crearBiblioteca,
        borrarLibro,
        borrarAutor,
        borrarBiblioteca,
        crearPrestamo,
        devolverPrestamo
    };
})();