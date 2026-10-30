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
        <div class="biblio-tabla-fila">
            <div>${esc(a.nombre)}</div>
            <div>${esc(a.nacionalidad)}</div>
            <div>${a.libros.length}</div>
            <div>
                <button class="biblio-autor-ver" data-id="${a.autorid}">Ver</button>
                <button class="biblio-autor-editar" data-id="${a.autorid}">Editar</button>
                <button class="biblio-autor-borrar" data-id="${a.autorid}">Borrar</button>
            </div>
        </div>`).join('');

        return `
            <section>
                <h2>Autores</h2>
                <button class="biblio-autor-crear">Crear autor</button>
                <div class="biblio-tabla-fila biblio-cabecera">
                    <div>Nombre</div><div>Nacionalidad</div><div>Libros</div><div>Acciones</div>
                </div>
                ${filas}
            </section>
        `;
    }

    function generarHTMLListadoBiblioteca(){
        const filas = bibliotecas.map(b => {
            const total = libros.filter(l => l.bibliotecaid === b.bibliotecaid).length;
            return `
            <div class="biblio-tabla-fila">
                <div>${esc(b.nombre)}</div>
                <div>${esc(b.ubicacion)}</div>
                <div>${total}</div>
                <div>
                    <button class="biblio-biblioteca-ver" data-id="${b.bibliotecaid}">Ver</button>
                    <button class="biblio-biblioteca-editar" data-id="${b.bibliotecaid}">Editar</button>
                    <button class="biblio-biblioteca-borrar" data-id="${b.bibliotecaid}">Borrar</button>
                </div>
            </div>`;
        }).join('');

        return `
            <section>
                <h2>Bibliotecas</h2>
                <button class="biblio-biblioteca-crear">Crear biblioteca</button>
                <div class="biblio-tabla-fila biblio-cabecera">
                    <div>Nombre</div><div>Ubicación</div><div>Libros</div><div>Acciones</div>
                </div>
                ${filas}
            </section>
        `;
    }

    const cabeceraLibros = `
        <div class="biblio-tabla-fila biblio-cabecera">
            <div>Titulo</div><div>ISBN</div><div>Autor</div><div>Biblioteca</div><div>Estado</div><div>Acciones</div>
        </div>`;

    function filaLibro(l, conAcciones = true){
        const autor = buscarAutor(l.autorid);
        const biblio = buscarBiblioteca(l.bibliotecaid);
        const acciones = conAcciones
            ? `<button class="biblio-libro-ver" data-id="${l.libroid}">Ver</button>
               <button class="biblio-libro-editar" data-id="${l.libroid}">Editar</button>
               <button class="biblio-libro-borrar" data-id="${l.libroid}">Borrar</button>`
            : `<button class="biblio-libro-ver" data-id="${l.libroid}">Ver</button>`;
        return `
            <div class="biblio-tabla-fila">
                <div>${esc(l.titulo)}</div>
                <div>${esc(l.isbn)}</div>
                <div>${autor ? esc(autor.nombre) : '--'}</div>
                <div>${biblio ? esc(biblio.nombre) : '--'}</div>
                <div>${l.estaDisponible ? 'Disponible' : 'Prestado'}</div>
                <div>${acciones}</div>
            </div>`;
    }

    function generarHTMLResultadoBuscador(resultados, tipo){
        if (resultados.length === 0) {
            return `<section><h2>Resultados</h2><p>No se han encontrado ${tipo}.</p></section>`;
        }

        if (tipo === 'autores') {
            const filas = resultados.map(a => `
                <div class="biblio-tabla-fila">
                    <div>${esc(a.nombre)}</div>
                    <div>${esc(a.nacionalidad)}</div>
                    <div>${a.libros.map(t => esc(t)).join(', ')}</div>
                    <div><button class="biblio-autor-ver" data-id="${a.autorid}">Ver</button></div>
                </div>`).join('');
            return `
                <section>
                    <h2>Autores encontrados (${resultados.length})</h2>
                    <div class="biblio-tabla">
                        <div class="biblio-tabla-fila biblio-cabecera">
                            <div>Nombre</div><div>Nacionalidad</div><div>Libros</div><div>Acciones</div>
                        </div>
                        ${filas}
                    </div>
                </section>
            `;
        }

        return `
            <section>
                <h2>Libros encontrados (${resultados.length})</h2>
                <div class="biblio-tabla">
                    ${cabeceraLibros}
                    ${resultados.map(l => filaLibro(l, false)).join('')}
                </div>
            </section>`;
    }

    function generarHTMLListadoLibros(){
        
        const filas = libros.map(i =>`
            <div class="biblio-tabla-fila">
                    <div>${esc(i.titulo)}</div>
                    <div>${esc(i.isbn)}</div>
                    <div>${buscarAutor(i.autorid) ? buscarAutor(i.autorid).nombre : '--' }</div>
                    <div>${buscarBiblioteca(i.bibliotecaid) ? buscarBiblioteca(i.bibliotecaid).nombre : '--' }</div>
                    <div>${i.estaDisponible ? 'Disponible' : 'Prestado'}</div>
                    <div>
                        <button class="biblio-libro-ver" data-id="${i.libroid}">Ver</button>
                        <button class="biblio-libro-editar" data-id="${i.libroid}">Editar</button>
                        <button class="biblio-libro-borrar" data-id="${i.libroid}">Borrar</button>
                    </div>
            </div>`).join("");

        return `
            <section>
                <h2>Libros</h2>
                <div data-componente="listado" class="biblio-tabla">
                    <button class="biblio-libro-crear">Crear libro</button>
                    <div class="biblio-tabla-fila biblio-cabecera">
                        <div>Titulo</div><div>ISBN</div><div>Autor</div><div>Biblioteca</div><div>Prestamos</div><div>Accion</div>
                    </div>
                    ${filas}
                </div>
            </section>
        `;
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
        
        let librosAutor = libros;

        librosAutor = librosAutor.filter(l => buscarAutor(l.autorid).nombre.toLowerCase() === autor.toLowerCase().trim());
        return librosAutor;
    }

    //console.log(buscarLibroPorAutor('Isabel Allende')); // Lista de 3 libros

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
        let biografia = autor.biografia?.trim() ?? '';   

        
        if(!nombre || !nacionalidad){                
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
        }
        return libro;  
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
        libro.prestamos.push(prestamo);

        return prestamo;
    }

    function devolverPrestamo(libro){
        if(!libro || libro.estaDisponible){
            return null;
        }

        const prestamo = libro.prestamos.find(p => !p.fechaDevolucion);
        prestamo.fechaDevolucion = new Date().toISOString().slice(0,10);

        return prestamo;
    }

    // EDITAR OBJETOS

    function editarLibro(id, datos){
        const viejo = buscarLibro(id);

        if(!viejo || !datos.titulo?.trim() || !datos.isbn?.trim()){
            return null;
        }

        const autorViejo = buscarAutor(viejo.autorid);
        if(autorViejo){
            const pos = autorViejo.libros.indexOf(viejo.titulo);    
            if(pos !== -1){
                autorViejo.libros.splice(pos, 1);
            }
        }

        const nuevo = new Libro(viejo.libroid, datos.titulo.trim(), datos.isbn.trim(),Number(datos.autorId), Number(datos.bibliotecaId), viejo.prestamos);
        libros = libros.map(l => l.libroid === viejo.libroid ? nuevo : l); 


        const autorNuevo = buscarAutor(nuevo.autorid);
        if(autorNuevo){
            autorNuevo.libros.push(nuevo.titulo);
        }
        return nuevo;
    }

    function editarAutor(id, datos){

        const viejo = buscarAutor(id);
        if(!viejo || !datos.nombre?.trim() || !datos.nacionalidad?.trim()) {
            return null;
        }

        const nuevo = new Autor(viejo.autorid, datos.nombre.trim(), datos.nacionalidad.trim(),datos.biografia?.trim() ?? '', viejo.libros);
        autores = autores.map(a => a.autorid === viejo.autorid ? nuevo : a);
        return nuevo;
    }

    function editarBiblioteca(id, datos){
        const viejo = buscarBiblioteca(id);
        if(!viejo || !datos.nombre?.trim() || !datos.ubicacion?.trim()) {
            return null;
        }

        const nuevo = new Biblioteca(viejo.bibliotecaid, datos.nombre.trim(), datos.ubicacion.trim());
        bibliotecas = bibliotecas.map(b => b.bibliotecaid === viejo.bibliotecaid ? nuevo : b);
        return nuevo;
    }

    function librosDeBiblioteca(id){
        return libros.filter(l => l.bibliotecaid === Number(id));
    }

    function anadirLibroAAutor(autorid, titulo){
        const autor = buscarAutor(autorid);
        const limpio = titulo?.trim();
        if(!autor || !limpio || autor.libros.includes(limpio)){
            return null;
        }
        autor.libros.push(limpio);
        return autor;
    }

    const listaAutores = () => [...autores];
    const listaBibliotecas = () => [...bibliotecas];

    return {
        listaAutores,
        listaBibliotecas,
        generarHTMLListadoAutores,
        generarHTMLListadoBiblioteca,
        generarHTMLListadoLibros,
        generarHTMLResultadoBuscador,  
        buscarLibro,
        buscarAutor,
        buscarLibroPorTitulo,
        buscarLibroPorAutor,
        buscarBiblioteca,
        librosDeBiblioteca,            
        anadirLibroAAutor,              
        crearLibro,
        crearAutor,
        crearBiblioteca,
        borrarLibro,
        borrarAutor,
        borrarBiblioteca,
        crearPrestamo,
        devolverPrestamo,
        editarLibro,
        editarAutor,
        editarBiblioteca
    };
})();

/*
const listarLibros = document.querySelector('#btn-listaLibros');
const listarAutores = document.querySelector('#btn-listaAutores');
const listarBiblio = document.querySelector('#btn-listaBiblio');


const app = document.querySelector('#app');

listarLibros.addEventListener('click', () =>{
    app.innerHTML = $biblio.generarHTMLListadoLibros();
});

listarAutores.addEventListener('click', ()=>{
    app.innerHTML = $biblio.generarHTMLListadoAutores();
});

listarBiblio.addEventListener('click', ()=>{
    app.innerHTML = $biblio.generarHTMLListadoBiblioteca();
});
*/

const app = document.querySelector('#app');

const pintar = html => app.innerHTML = html;
const render = pintar;

function vistaLibro(id){
    const l = $biblio.buscarLibro(id);
    if(!l){ return render($biblio.generarHTMLListadoLibros()); }
    render(l.generarHTMLPropiedades($biblio.buscarAutor(l.autorid), $biblio.buscarBiblioteca(l.bibliotecaid)));
}

function vistaAutor(id){
    const a = $biblio.buscarAutor(id);
    if(!a){ return render($biblio.generarHTMLListadoAutores()); }
    render(a.generarHTMLPropiedades());
}

function vistaBiblioteca(id){
    const b = $biblio.buscarBiblioteca(id);
    if(!b){ return render($biblio.generarHTMLListadoBiblioteca()); }
    render(b.generarHTMLPropiedades($biblio.librosDeBiblioteca(id)));
}

const clics = {
    'biblio-libro-listar':      () => pintar($biblio.generarHTMLListadoLibros()),
    'biblio-autor-listar':      () => pintar($biblio.generarHTMLListadoAutores()),
    'biblio-biblioteca-listar': () => pintar($biblio.generarHTMLListadoBiblioteca()),

    'biblio-libro-crear': () =>  pintar(new Libro().generarHTMLCreacion($biblio.listaAutores(), $biblio.listaBibliotecas())),
    'biblio-libro-ver': id => vistaLibro(id),  
    'biblio-libro-editar': id => pintar($biblio.buscarLibro(id).generarHTMLEdicion($biblio.listaAutores(), $biblio.listaBibliotecas())),
    'biblio-libro-borrar': id => { $biblio.borrarLibro(id); pintar($biblio.generarHTMLListadoLibros()); },
    'biblio-libro-listar-prestamos': id => pintar($biblio.buscarLibro(id).generarHTMLLIstadoPrestamos()),
    'biblio-libro-prestar':   id => { const l = $biblio.buscarLibro(id); $biblio.crearPrestamo(l);   clics['biblio-libro-ver'](id); },
    'biblio-libro-devolver':  id => { const l = $biblio.buscarLibro(id); $biblio.devolverPrestamo(l); clics['biblio-libro-ver'](id); },

    'biblio-autor-crear': () => pintar(new Autor().generarHTMCreacin()),
    'biblio-autor-ver': id => pintar($biblio.buscarAutor(id).generarHTMLPropiedades()),
    'biblio-autor-editar': id => pintar($biblio.buscarAutor(id).generarHTMLEdicion()),
    'biblio-autor-borrar': id => {
        $biblio.borrarAutor(id); 
        pintar($biblio.generarHTMLListadoAutores());
    },
    'biblio-autor-quitar-libro': (id, boton) => {
        const autor = $biblio.buscarAutor(id);
        const pos = autor.libros.indexOf(boton.dataset.titulo);
        if(pos !== -1){
            autor.libros.splice(pos, 1);
        }
        pintar(autor.generarHTMLPropiedades());
    },

    'biblio-biblioteca-crear': () => pintar(new Biblioteca().generarHTMLCreacion()),
    'biblio-biblioteca-ver': id => vistaBiblioteca(id), 
    'biblio-biblioteca-editar': id => pintar($biblio.buscarBiblioteca(id).generarHTMLEdicion()),
    'biblio-biblioteca-borrar': id => {
        $biblio.borrarBiblioteca(id);
        pintar($biblio.generarHTMLListadoBiblioteca());
    }
};

document.addEventListener('click', e => {
    const boton = e.target.closest('button');

    if(!boton){
        return;
    }
    const clase = [...boton.classList].find(c => clics[c]);
    if(clase){
        clics[clase](boton.dataset.id, boton);
    }
});

const envios = {
    'biblio-libro-form-crear': d => ({
        ok: $biblio.crearLibro({ titulo: d.titulo, isbn: d.isbn, autorid: d.autorId, bibliotecaid: d.bibliotecaId }),
        volver: () => render($biblio.generarHTMLListadoLibros())
    }),
    'biblio-libro-form-editar': (d, id) => ({
        ok: $biblio.editarLibro(id, d),
        volver: () => vistaLibro(id)
    }),
    'biblio-autor-form-crear': d => ({
        ok: $biblio.crearAutor(d),
        volver: () => render($biblio.generarHTMLListadoAutores())
    }),
    'biblio-autor-form-editar': (d, id) => ({
        ok: $biblio.editarAutor(id, d),
        volver: () => vistaAutor(id)
    }),
    'biblio-autor-form-anadir-libro': (d, id) => ({
        ok: $biblio.anadirLibroAAutor(id, d.titulo),
        volver: () => vistaAutor(id)
    }),
    'biblio-biblioteca-form-crear': d => ({
        ok: $biblio.crearBiblioteca(d),
        volver: () => render($biblio.generarHTMLListadoBiblioteca())
    }),
    'biblio-biblioteca-form-editar': (d, id) => ({
        ok: $biblio.editarBiblioteca(id, d),
        volver: () => vistaBiblioteca(id)
    }),
};

document.addEventListener('submit', e => {
    const form = e.target;
    const clase = [...form.classList].find(c => Object.hasOwn(envios, c));
    if(!clase) return;
    e.preventDefault();

    const datosForm = Object.fromEntries(new FormData(form));
    const { ok, volver } = envios[clase](datosForm, form.dataset.id);

    if(!ok){
        alert('Los datos no son válidos o ya existen.');
        return;
    }
    volver();
});

const buscador = document.querySelector('#buscador');
buscador.addEventListener('submit', e => {
    e.preventDefault();
    const { texto, tipo } = Object.fromEntries(new FormData(buscador));
    const resultados = tipo === 'autores'
        ? $biblio.buscarLibroPorAutor(texto)
        : $biblio.buscarLibroPorTitulo(texto);
    render($biblio.generarHTMLResultadoBuscador(resultados, tipo));
});