class Juguete{
    #_jugueteId;
    #nombre
    #marca
    #precio

    constructor(jugueteId = 0, nombre = '', marca = '', precio = 0){
        this.#_jugueteId = jugueteId;
        this.#nombre = nombre;
        this.#marca = marca;
        this.#precio = precio;
    }

    get jugueteId(){
        return this.#_jugueteId;
    }

    set #jugueteId(id){
        this.#_jugueteId = id;
    }

    get nombre(){
        return this.#nombre;
    }

    get marca(){
        return this.#marca;
    }

    get precio(){
        return this.#precio;
    }

    set nombre(nombre){
        if(nombre !== null){
            this.#nombre = nombre;
        }else{
            console.log('nombre invalido');
            return;
        }
    }

    set marca(marca){
        if(marca !== marca){
            this.#marca = marca;
        }else{
            console.log('marca invalida');
            return;
        }
    }

    set precio(precio){
        if(precio !== null){
            this.#precio = precio;
        }else{
            console.log('precio invalido');
            return;
        }
    }

    generarHTMLPropiedades(){
            return `<form data-componente="propiedades" name="jg-formulario">
                        <input type="hidden" id="jugueteid" name="jugueteid"
                        value="${this.#_jugueteId}">
                    <div>
                        <label for="nombre">Nombre del juguete:</label>
                        <input type="text" id="nombre" name="nombre"
                        placeholder="Ej. Camión de bomberos" value="${this.nombre}" required>
                    </div>
                    <div>
                        <label for="marca">Marca:</label>
                        <input type="text" id="marca" name="marca"
                        placeholder="Ej. Hot Wheels" value="${this.marca}" required>
                    </div>
                    <div>
                        <label for="precio">Precio:</label>
                        <input type="number" id="precio" name="precio"
                        placeholder="Ej. 19.99" step="0.01" value="${this.precio}"required>
                    </div>
                    <div>
                        <button type="submit">Guardar</button>
                    </div>
                </form>`;
    }
}
export default Juguete;