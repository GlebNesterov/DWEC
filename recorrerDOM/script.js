'use strict';

const $rec = (function (){

    function obtenerEstructuraJSON(elemento = document.body){

        let lstClass = [];

        for(let clase of elemento.classList){
            lstClass.push(clase);
        }

        let lstData = {};

        for(let clave in elemento.dataset){
            lstData[clave] = elemento.dataset[clave];
        }


        let lstHijos = [];

        for(let nodo of elemento.children){
            lstHijos.push(obtenerEstructuraJSON(nodo));
        }

        return {
            etiqueta: elemento.tagName,
            texto: elemento.textContent,
            tieneId: elemento.id ? true : false,
            lstClass : lstClass,
            lstData : lstData,
            lstHijos : lstHijos
        }
    }

    function imprimirEstructura(selector){
        const lista = document.querySelector(selector);
        let res = [];
        let sel = [...lista];
        
        while(lista.parent.tagName !== 'document'){
            let etiqueta = sel.tagName;
            let identificador = sel.id ? id : 'noid';
            let clases = sel.classList;
            let texto = sel.textContent;

            res.unshift(etiqueta, identificador, clases, texto);
        }

        return res;
    }

    return {
        obtenerEstructuraJSON,
        imprimirEstructura
    };
})();

//console.log(document.body.getElementsByTagName('*'));

//console.log($rec.obtenerEstructuraJSON());

console.log($rec.imprimirEstructura('div'));

