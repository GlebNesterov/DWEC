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

    // Refactorizar con dom
    /*
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
    */

    generarHTMLPropiedades(){
        let formulario = document.createElement('form');
        formulario.dataset.componente = 'propiedades';
        formulario.name = 'jg-formulario';

        let inputId = document.createElement('input');
        inputId.type = 'hidden';
        inputId.id = 'jugueteid';
        inputId.name = 'jugueteid';
        inputId.value = this.#_jugueteId;

        formulario.appendChild(inputId);

        let div1 = document.createElement('div')
        let labelNombre = document.createElement('label');
        labelNombre.for = 'nombre';
        labelNombre.textContent = 'Nombre del juguete:';
        let inputNombre = document.createElement('input');
        inputNombre.type = 'text';
        inputNombre.id = 'nombre';
        inputNombre.name = 'nombre';
        inputNombre.placeholder = 'Ej. Hot Wheels';
        inputNombre.value = this.#nombre;
        inputNombre.required;

        div1.appendChild(labelNombre);
        div1.appendChild(inputNombre);

        let div2 = document.createElement('div');
        let labelMarca = document.createElement('label');
        labelMarca.for = 'marca';
        labelMarca.textContent = 'Marca del juguete:';
        let inputMarca = document.createElement('input');
        inputMarca.type = 'text';
        inputMarca.id = 'marca';
        inputMarca.name = 'marca';
        inputMarca.placeholder = 'Ej. Hot Wheels';
        inputMarca.value = this.#nombre;
        inputMarca.required;

        div2.appendChild(labelMarca);
        div2.appendChild(inputMarca);
        

        let div3 = document.createElement('div');
        let labelPrecio = document.createElement('label');
        labelPrecio.for = 'precio';
        labelPrecio.textContent = 'Precio del juguete:';
        let inputPrecio = document.createElement('input');
        inputPrecio.type = 'number';
        inputPrecio.id = 'precio';
        inputPrecio.name = 'precio';
        inputPrecio.step = 0.01;
        inputPrecio.placeholder = 'Ej. 19.99';
        inputPrecio.value = this.#precio;
        inputPrecio.required;

        div3.appendChild(labelPrecio);
        div1.appendChild(inputPrecio);
        


        console.log(formulario);
    }
}
export default Juguete;