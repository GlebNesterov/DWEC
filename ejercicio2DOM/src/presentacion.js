import NodoInspector from "./nodoInspector.js";

//const elementosBody = document.querySelectorAll("*");
const nodo = new NodoInspector();

  //elemento = null;
  

function informacion() {
    return JSON.stringify(nodo.obtenerInfo(), null, 4);
}

export function creaPanel() {
    const contenedor = document.createElement("div");
    contenedor.classList.add("contenedorDepu");
    
    const botones = [
        "raiz",
        "padre",
        "primer-hijo",
        "ultimo-hijo",
        "hermano-anterior",
        "hermano-siguiente"
    ];

    const botonesHTML = {};

    let info = document.createElement("textarea");
    info.readOnly = true;
    info.textContent = informacion();
    contenedor.appendChild(info);
    botones.map((texto) => {
      const boton = document.createElement("button");
      boton.textContent = texto;
      contenedor.appendChild(boton);
      botonesHTML[texto] = boton;
    });
    document.body.append(contenedor);


    botonesHTML['raiz'].addEventListener('click', ()=>{
        nodo.irARaiz();
        actualizarPane();
        console.log("has clicado raiz");
    });

    botonesHTML['padre'].addEventListener('click', ()=>{
        nodo.irAlPadre();
        actualizarPane();
        console.log("has clicado padre");
    });

    botonesHTML['primer-hijo'].addEventListener('click', ()=>{
        nodo.irAlPrimerHijo();
        actualizarPane();
        //this.panel();
    });

    botonesHTML['ultimo-hijo'].addEventListener('click',()=>{
        nodo.irAlUltimoHijo();
        actualizarPane();
    });

    botonesHTML['hermano-anterior'].addEventListener('click', ()=>{
        nodo.irAlAnteriorHermano();
        actualizarPane();
    });

    botonesHTML['hermano-siguiente'].addEventListener('click', ()=>{
        nodo.irAlSiguienteHermano();
        actualizarPane();
    });

    function actualizarPane(){
        info.value = informacion();

        botonesHTML['raiz'].disabled = nodo.esRaiz;
        botonesHTML['padre'].disabled = nodo.esRaiz;

        botonesHTML['primer-hijo'].disabled = !nodo.tieneHijos;
        botonesHTML['ultimo-hijo'].disabled = !nodo.tieneHijos;

        botonesHTML['hermano-anterior'].disabled = nodo.esRaiz || nodo.esPrimerHijo;

        botonesHTML['hermano-siguiente'].disabled = nodo.esRaiz || nodo.esUltimoHijo;
    }

    document.body.append(contenedor);
    return contenedor;
  }
