/*
    Propiedades: autorId, nombre, nacionalidad, biografía, libros (lista con los títulos de los 
    libros publicados (UN TÍTULO NO ES UN ID)). 

    Métodos: 
        • generarHTMLCreacion(): Formulario para crear un nuevo autor. 
        • generarHTMLPropiedades(): Detalles del autor y una tabla con los libros 
        publicados. Incluye opciones de menú para: añadir y eliminar libros. 
        • generarHTMLEdicion(): Formulario para editar un autor. 

    NOTA: te doy libertad para que pienses como gestionar la añadir y eliminar libros. 

*/

import { esc } from './utilidades.js';

class Autor {
    #_autorid;
    #nombre;
    #nacionalidad;
    #biografia;
    #libros

    constructor(autorid = 0, nombre, nacionalidad, biografia, libros = []){
        this.#_autorid = autorid;
        this.#nombre = nombre;
        this.#nacionalidad = nacionalidad;
        this.#biografia = biografia;
        this.#libros = libros;
    }

    get autorid(){
        return this.#_autorid;
    }

    get nombre(){
        return this.#nombre;
    }

    get nacionalidad(){
        return this.#nacionalidad;
    }

    get biografia(){
        return this.#biografia;
    }
    
    get libros(){
        return this.#libros;
    }

    generarHTMCreacin(){
        return `
            <section>
            <h2>Nuevo autor</h2>
            <form class="biblio-autor-form-crear">
                <label>Nombre <input type="text" name="nombre" required></label>
                <label>Nacionalidad <input type="text" name="nacionalidad" required></label>
                <label>Biografía <textarea name="biografia" rows="4"></textarea></label>
                <button type="submit">Guardar</button>
                <button type="button" class="biblio-autor-listar">Cancelar</button>
            </form>
            </section>`;
    }

    generarHTMLPropiedades(){
        const filas = this.#libros.map(titulo => `
            <tr>
                <td>${esc(titulo)}</td>
                <td>
                    <button class="biblio-autor-quitar-libro"
                            data-id="${this.#_autorid}"
                            data-titulo="${esc(titulo)}">Eliminar</button>
                </td>
            </tr>`).join('');

        return `
            <section class="biblio-autor-detalle" data-id="${this.#_autorid}">
            <h2>${esc(this.#nombre)}</h2>
            <p><strong>Nacionalidad:</strong> ${esc(this.#nacionalidad)}</p>
            <p>${esc(this.#biografia)}</p>

            <h3>Libros publicados</h3>
            ${this.#libros.length === 0
                ? '<p>Este autor no tiene libros registrados.</p>'
                : `<table>
                    <thead><tr><th>Título</th><th>Acciones</th></tr></thead>
                    <tbody>${filas}</tbody>
                    </table>`}

            <form class="biblio-autor-form-anadir-libro" data-id="${this.#_autorid}">
                <input type="text" name="titulo" placeholder="Título del nuevo libro" required>
                <button type="submit">Añadir libro</button>
            </form>

            <nav>
                <button class="biblio-autor-editar" data-id="${this.#_autorid}">Editar</button>
                <button class="biblio-autor-borrar" data-id="${this.#_autorid}">Borrar</button>
                <button class="biblio-autor-listar">Volver al listado</button>
            </nav>
        </section>
        `;
    }

    generarHTMLEdicion(){
        return `
            <section>
                <h2>Editar autor</h2>
                <form class="biblio-autor-form-editar" data-id="${this.#_autorid}">
                    <label>Nombre <input type="text" name="nombre" value="${esc(this.#nombre)}" required></label>
                    <label>Nacionalidad <input type="text" name="nacionalidad" value="${esc(this.#nacionalidad)}" required></label>
                    <label>Biografía <textarea name="biografia" rows="4">${esc(this.#biografia)}</textarea></label>
                    <button type="submit">Guardar cambios</button>
                    <button type="button" class="biblio-autor-ver" data-id="${this.#_autorid}">Cancelar</button>
                </form>
            </section>
        `;
    }
}
export default Autor;