import NodoInspector from "./nodoInspector.js";

//const elementosBody = document.querySelectorAll("*");
const nodo = new NodoInspector();

  //elemento = null;
  

function informacion() {
    return JSON.stringify(nodo.obtenerInfo());
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

    let info = document.createElement("textarea");
    info.readOnly = true;
    info.textContent = informacion();
    contenedor.appendChild(info);
    botones.map((texto) => {
      const boton = document.createElement("button");
      boton.textContent = texto;
      contenedor.appendChild(boton);
    });

    botones['raiz'].addEventListener('click', ()=>{
        nodo.irAlPadre();
        info.textContent = informacion();
        console.log("has clicado padre");
    })

    botones['padre'].addEventListener('click', ()=>{
        nodo.irAlPadre();
        info.textContent = informacion();
        console.log("has clicado padre");
    })

    botones['primer-hijo'].addEventListener('click', ()=>{
        nodo.irAlPrimerHijo();
        //this.panel();
    })

    botones['ultimo-hijo'].addEventListener('click',()=>{
        nodo.irAlUltimoHijo();
    })

    botones['hermano-anterior'].addEventListener('click', ()=>{
        nodo.irAlAnteriorHermano();
    })

    botones['hermano-siguiente'].addEventListener('click', ()=>{
        nodo.irAlSiguienteHermano();
    })

    document.body.append(contenedor);
  }

/*
        switch (boton.dataset.accion) {
        case "raiz": {
            boton[].addEventListener("click", () => {
            nodo.irARaiz();
            console.log("has clicado raiz");
            });
        }
        case "padre": {
            boton.addEventListener("click", () => {
            nodo.irAlPadre();
            console.log("has clicado padre");
            //this.panel();
            });
        }
        case "primer-hijo": {
            boton.addEventListener("click", () => {
            this.nodo.irAlPrimerHijo();
            //this.panel();
            });
        }
        case "ultimo-hijo": {
            boton.addEventListener("click", () => {
            this.nodo.irAlUltimoHijo();
            //this.panel();
            });
        }
        case "hermano-anterior": {
            boton.addEventListener("click", () => {
            this.nodo.irAlAnteriorHermano();
            //this.panel();
            });
        }
        case "hermano-siguiente": {
            boton.addEventListener("click", () => {
            this.nodo.irAlSiguienteHermano();
            //this.panel();
            });
        }
        }
    */