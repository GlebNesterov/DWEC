export const main=(function(){



    function cambiaH1(id,texto){
        const miH1=document.getElementById(id);
        miH1.textContent=texto;
        miH1.classList.add('miClase');
        setTimeout(()=>{
            miH1.classList.remove('miClase');
        },2000);
    }

    function creaParrafo(texto,id='miId'){
        const parrafo=document.createElement('p');
        parrafo.textContent=texto;
        parrafo.id=id;
        parrafo.classList.add('parrafoCreado');
        const contenedor=document.getElementById('contenido');
        contenedor.appendChild(parrafo);
    }

    function retrasaParrafo(texto,tiempo,id){
        setTimeout(()=>{
            creaParrafo(texto,id);
        },tiempo*1000);
    }

    function eliminaId(id){
        const elemento=document.getElementById(id);
        elemento.remove();
    }

    function eliminaIdContenedor(contenedor,id){
        const elemento=document.getElementById(id);
        contenedor.removeChild(elemento);
    }

    return {
        cambiaH1,
        creaParrafo,
        retrasaParrafo,
        eliminaId,
        eliminaIdContenedor,
    }
})();

main.cambiaH1('h1Principal',"Cambio el texto de este h1");

main.retrasaParrafo("He creado éste párrafo.",1,'p1');

main.retrasaParrafo("Otro párrafo",1,'p2');

main.retrasaParrafo("Otro párrafo más",1,'p3');

main.retrasaParrafo("Segundo párrafo",1,'p4');

setTimeout(()=>{
    main.eliminaId('p1')},2000);

setTimeout(()=>{
    main.eliminaIdContenedor(document.getElementById('contenido'),'p4');
},3000);


//EJEMPLOS ATRIBUTOS
const contenedor=document.getElementById('contenido');
/*
contenedor.setAttribute('gleb',"Hola Gleb");
const valorGleb=contenedor.getAttribute('gleb');
console.log(valorGleb);
contenedor.removeAttribute('gleb');
const nuevoValorGleb=contenedor.getAttribute('gleb');
console.log(nuevoValorGleb);

const atributos=contenedor.attributes;
Array.from(atributos).forEach(e=>console.log(e));
*/
//EJEMPLO data-*
console.log(contenedor.getAttribute('value'));