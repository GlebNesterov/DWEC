/*
    Propiedades: libroId, titulo, ISBN, autorId, bibliotecaId, prestamos (lista con la fecha de 
    préstamo y fecha de devolución), estaDisponible (calculada).

    Métodos: 
        • generarHTMLCreacion(): Formulario para crear un nuevo libro. 
        • generarHTMLPropiedades(): Detalles del libro. Incluye opciones de menú para: 
            editar, borrar, listar prestamos, crear préstamo, devolver préstamo, listar préstamos. 
        • generarHTMLEdicion(): Formulario para editar un libro. 
        • generarHTMLListadoPrestamos(): Listado de préstamos.

    NOTA: te doy libertad para que pienses como gestionar la solicitud de préstamo y 
        devolución. 
*/

import { esc, opciones } from './utilidades.js';

class Libro{
    #_libroid;
    #titulo;
    #isbn;
    #autorid;
    #bibliotecaid;
    #prestamos;


    constructor(libroid = 0, titulo, isbn, autorid, bibliotecaid, prestamos){
        this.#_libroid = libroid;
        this.#titulo = titulo;
        this.#isbn = isbn;
        this.#autorid = autorid;
        this.#bibliotecaid = bibliotecaid;
        this.#prestamos =  prestamos;
    }

    estaDisponible(){
        return !this.#prestamos.some(p => !p.fechaDevolucion);
    }

    get libroid(){
        return this.#_libroid;
    }

    set #libroid(id){
        if(id !== null){
            this.#_libroid = id;
        }
        return;
    }

    get titulo(){
        return this.#titulo;
    }

    get isbn(){
        return this.#isbn;
    }

    get autorid(){
        return this.#autorid;
    }

    get bibliotecaid(){
        return this.#bibliotecaid;
    }

    get prestamos(){
        return this.#prestamos;
    }

    generarHTMLCreacion(autores = [], bibliotecas = []){
        return `
            <section>
            <h2>Nuevo libro</h2>
            <form class="biblio-libro-form-crear">
                <label>Título <input type="text" name="titulo" required></label>
                <label>ISBN <input type="text" name="isbn" required></label>
                <label>Autor
                    <select name="autorId" required>
                        ${opciones(autores, a => a.autorid, a => a.nombre)}
                    </select>
                </label>
                <label>Biblioteca
                    <select name="bibliotecaId" required>
                        ${opciones(bibliotecas, b => b.bibliotecaid, b => b.nombre)}
                    </select>
                </label>
                <button type="submit">Guardar</button>
                <button type="button" class="biblio-libro-listar">Cancelar</button>
            </form>
        </section>
        `;
    }
    
    generarHTMLPropiedades(autor, biblioteca) {
        const disponible = this.estaDisponible;
        // Solo se muestra la acción que tiene sentido según el estado
        const botonPrestamo = disponible
            ? `<button class="biblio-libro-prestar" data-id="${this.#_libroid}">Crear préstamo</button>`
            : `<button class="biblio-libro-devolver" data-id="${this.#_libroid}">Devolver préstamo</button>`;

        return `
        <section class="biblio-libro-detalle" data-id="${this.#_libroid}">
            <h2>${esc(this.#titulo)}</h2>
            <dl>
                <dt>ISBN</dt><dd>${esc(this.#isbn)}</dd>
                <dt>Autor</dt><dd>${autor ? esc(autor.nombre) : 'Desconocido'}</dd>
                <dt>Biblioteca</dt><dd>${biblioteca ? esc(biblioteca.nombre) : 'Sin asignar'}</dd>
                <dt>Estado</dt>
                <dd class="${disponible ? 'biblio-disponible' : 'biblio-no-disponible'}">
                    ${disponible ? 'Disponible' : 'Prestado'}
                </dd>
            </dl>
            <nav>
                <button class="biblio-libro-editar" data-id="${this.#_libroid}">Editar</button>
                <button class="biblio-libro-borrar" data-id="${this.#_libroid}">Borrar</button>
                <button class="biblio-libro-listar-prestamos" data-id="${this.#_libroid}">Ver préstamos</button>
                ${botonPrestamo}
                <button class="biblio-libro-listar">Volver al listado</button>
            </nav>
        </section>`;
    }

    generarHTMLEdicion(autores = [], bibliotecas = []){
        return `
            <section>
                <h2>Editar libro</h2>
                <form class="biblio-libro-form-editar" data-id="${this.#_libroid}">
                    <label>Título <input type="text" name="titulo" value="${esc(this.#titulo)}" required></label>
                    <label>ISBN <input type="text" name="isbn" value="${esc(this.#isbn)}" required></label>
                    <label>Autor
                        <select name="autorId">
                            ${opciones(autores, a => a.autorid, a => a.nombre, this.#autorid)}
                        </select>
                    </label>
                    <label>Biblioteca
                        <select name="bibliotecaId">
                            ${opciones(bibliotecas, b => b.bibliotecaid, b => b.nombre, this.#bibliotecaid)}
                        </select>
                    </label>
                    <button type="submit">Guardar cambios</button>
                    <button type="button" class="biblio-libro-ver" data-id="${this.#_libroid}">Cancelar</button>
                </form>
            </section>
        `;
    }

    generarHTMLLIstadoPrestamos(){
        const filas = this.#prestamos.map(p => `
            <tr>
                <td>${esc(p.fechaPrestamo)}</td>
                <td>${p.fechaDevolucion ? esc(p.fechaDevolucion) : '<em>Pendiente de devolución</em>'}</td>
            </tr>`).join('');

        return `
            <section>
            <h2>Préstamos de «${esc(this.#titulo)}»</h2>
            ${this.#prestamos.length === 0
                ? '<p>Este libro nunca se ha prestado.</p>'
                : ` <table>
                        <thead><tr><th>Fecha de préstamo</th><th>Fecha de devolución</th></tr></thead>
                        <tbody>${filas}</tbody>
                    </table>`}
            <button class="biblio-libro-ver" data-id="${this.#_libroid}">Volver al libro</button>
        </section>
        `;
    }
}
export default Libro;