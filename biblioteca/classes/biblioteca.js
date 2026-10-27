/*
    Propiedades: bibliotecaId, nombre, ubicación, libros (lista de objetos libro asignados a la 
        biblioteca, calculada a partir de libros).

    Métodos: 
        • generarHTMLCreacion(): Formulario para crear una nueva biblioteca. 
        • generarHTMLEdicion(): Formulario para editar una biblioteca. 
*/

class Biblioteca{
    #_bibliotecaid;
    #nombre;
    #ubicacion;
    #libros
    
    constructor(bibliotecaid = 0, nombre, ubicacion, libros) {
        this.#_bibliotecaid = bibliotecaid;
        this.#nombre = nombre;
        this.#ubicacion = ubicacion;
        this.#libros = libros;
    }

    get bibliotecaid(){
        return this.#_bibliotecaid;
    }

    get nombre(){
        return this.#nombre;
    }

    get ubicacion(){
        return this.#ubicacion;
    }

    get libros(){
        return this.#libros;
    }

    generarHTMLCreacion(){
        return `
            <section>
                <h2>Nueva biblioteca</h2>
                <form class="biblio-biblioteca-form-crear">
                    <label>Nombre <input type="text" name="nombre" required></label>
                    <label>Ubicación <input type="text" name="ubicacion" required></label>
                    <button type="submit">Guardar</button>
                    <button type="button" class="biblio-biblioteca-listar">Cancelar</button>
                </form>
            </section>
        `;
    }

    generarHTMLEdicion(){
        return `
            <section>
                <h2>Editar biblioteca</h2>
                <form class="biblio-biblioteca-form-editar" data-id="${this.#_bibliotecaid}">
                    <label>Nombre <input type="text" name="nombre" value="${esc(this.#nombre)}" required></label>
                    <label>Ubicación <input type="text" name="ubicacion" value="${esc(this.#ubicacion)}" required></label>
                    <button type="submit">Guardar cambios</button>
                    <button type="button" class="biblio-biblioteca-listar">Cancelar</button>
                </form>
            </section>
        `;
    }
}