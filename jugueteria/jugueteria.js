import Juguete from "./juguete.js";
import datosJuguetes from "./datos.js";


class Jugueteria{
    //contenedor: privado. Referencia al contenedor donde se renderiza la aplicación.
    //juguetes: privado. Lista de juguetes (clase Juguete).
    //contador: privado. Almacena el jugueteId máximo
    #contenedor;
    #juguetes = [];
    #contador = 0;

    //constructor(): Carga los datos de prueba, inicializa la lista juguetes y el contador.
    constructor(){
        this.#juguetes = datosJuguetes.map(d => new Juguete(d.jugueteId, d.nombre, d.marca, d.precio));
        //console.log(this.#juguetes);
        this.#contador = Math.max(0, ...this.#juguetes.map(j => j.jugueteId));
        //  console.log(this.#contador);
    }
    
    iniciarApp(selector){
        this.#contenedor = document.querySelector(selector);
        if(!this.#contenedor){
            alert('Error al iniciar el formulario');
            return;
        }
        this.#navegarInicio();
    }

    /*
    iniciarApp(selector){
        this.#contenedor = document.querySelector(selector);
        console.log(this.#contenedor);
        alert('!!!')
    }
    */
    

    obtenerJuguetes(filtro){
        if(!filtro){
            return [...this.#juguetes];
        }else{
            return this.#juguetes.filter(j => j.nombre.toLowerCase().includes(filtro.toLowerCase()));
        }
    } 

    obtenerJuguete(id){
        return this.#juguetes.find(j => j.jugueteId === Number(id));
    }

    crearJuguete(nuevo){
        let jug = new Juguete(++this.#contador, nuevo.nombre, nuevo.marca, nuevo.precio);
        if(this.#juguetes.push(jug)){
            return 1;
        }else{
            retun -1;
        }
    }

    borrarJuguete(id){
        this.#juguetes = this.#juguetes.filter(j => j.jugueteId !== Number(id));
    }

    #navegarInicio(){
        this.#contenedor.innerHTML = this.generarHTMLNavegacion() + this.generarHTMLBuscador() + this.generarHTMLListado(this.obtenerJuguete());
        this.#asignarEventos();
    }

    #navegarListadoJuguetes(){
        this.#contenedor.innerHTML = this.generarHTMLNavegacion() + this.generarHTMLListado(this.obtenerJuguete());
        this.#asignarEventos();
    }

    #navegarPropiedades(juguete){
        this.#contenedor.innerHTML = this.generarHTMLNavegacion();
        juguete.generarHTMLPropiedades();
        this.#asignarEventos();
    }

    #eventosNavegacion(){
        const nav = this.#contenedor.querySelector('[data-componente="navegacion"]');
        nav.addEventListener('click', (e) =>{
            e.preventDefault();
            if(e.target.dataset.destino === 'inicio'){
                this.#navegarInicio();
            }else if(e.target.dataset.destino === 'listadojuguetes'){
                this.#navegarListadoJuguetes();
            }
        });
    }

    #eventosBuscador(){
        const form = this.#contenedor.querySelector('[data-componente="buscador"]');
        form?.addEventListener('submit', (e) =>{
            e.preventDefault();
            const inp = this.#contenedor.querySelector('#jg-buscador-filtro');
            const filtro = inp.value;
            const lista = this.obtenerJuguetes(filtro);
            
            const listado = this.#contenedor.querySelector('[data-componente="listado"]');
            listado.outerHTML = this.generarHTMLListado(lista);
            this.#eventosListado();
        });
    }

    #eventosListado(){
        const div = this.#contenedor.querySelector('[data-componente="listado"]');
        div?.addEventListener('click', (e) =>{
            const boton = e.target.closest("button");
            if(boton === null){
                return;
            }
            const accion = boton.dataset.accion;
            const id = boton.dataset.id;
            
            if(accion === 'ver'){
                const j = this.obtenerJuguete(id);
                if(!j){
                    alert('El id no existe');
                }else{
                    this.#navegarPropiedades(j);
                }
            }else if(accion === 'borrar'){
                this.borrarJuguete(id);
                this.#navegarInicio();
            }else if (accion === 'nuevo'){
                this.#navegarPropiedades(new Juguete());
            }
        });
    }

    #eventosPropiedades(){
        const form = this.#contenedor.querySelector('[data-componente="propiedades"]');
        form?.addEventListener('submit', (e) =>{
            e.preventDefault();
            const datos = new FormData(e.target);
            const id = Number(datos.get('jugueteid'));
            const nombre = datos.get('nombre');
            const marca = datos.get('marca');
            const precio = Number(datos.get('precio'));

            if(id === 0){
                this.crearJuguete(new Juguete(0, nombre, marca, precio));
            }else {
                let j = this.obtenerJuguete(id);
                j.nombre = nombre;
                j.marca = marca;
                j.precio = precio;
            }
            this.#navegarListadoJuguetes();
        });
    }

    #asignarEventos(){
        this.#eventosBuscador();
        this.#eventosNavegacion();
        this.#eventosPropiedades()
        this.#eventosListado();
    }

    generarHTMLNavegacion() {
        return `<nav data-componente="navegacion" class="jg-navegacion">
                    <ul>
                        <li><a href="#" data-destino="inicio">Inicio</a></li>
                        <li><a href="#" data-destino="listadojuguetes">Listado</a></li>
                    </ul>
                </nav>`;
    }

    generarHTMLBuscador(){
        return `
            <form data-componente="buscador" name="jg-buscador">
                <input type="text" id="jg-buscador-filtro" placeholder="Buscar por nombre..." />
                <button type="submit">Buscar</button>
            </form>`;
    }

    generarHTMLListado(listaJuguetes) {
        listaJuguetes = this.#juguetes;
        const filas = listaJuguetes.map(j => `
            <div class="jg-tabla-fila">
                    <div>${j.nombre}</div>
                    <div>${j.marca}</div>
                    <div>${j.precio}</div>
                    <div>
                        <button data-accion="ver" data-id="${j.jugueteId}">Ver</button>
                        <button data-accion="borrar" data-id="${j.jugueteId}">Borrar</button>
                    </div>
            </div>`).join("");

        return `
            <div data-componente="listado" class="jg-tabla">
                <div class="jg-tabla-fila jg-cabecera">
                    <div>Nombre</div><div>Marca</div><div>Precio</div><div>Acciones</div>
                </div>
                ${filas}
                <button data-accion="nuevo">Nuevo juguete</button>
            </div>
            `;
    }
}

const app = new Jugueteria();


// funciona 
//console.log(app.obtenerJuguetes('Set'));

// funciona 
//console.log(app.obtenerJuguete(2));

/*
    // funciona
    console.log(app.obtenerJuguetes());

    let nuevo = new Juguete('Robot', 'transformer', '13.9');
    console.log(app.crearJuguete(nuevo));
    console.log(app.obtenerJuguetes());
*/

/*
    // funciona
    console.log(app.obtenerJuguetes());
    app.borrarJuguete(2)
    console.log(app.obtenerJuguetes());
*/

//app.generarHTMLBuscador();
app.iniciarApp('#app');
