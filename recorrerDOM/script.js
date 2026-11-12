'use strict';

const $rec = (function (){
    const listaJSON = [
        {
            etiqueta: '',
            texto: '',
            tieneId: false
        }
    ];

    function obtenerEstructuraJSON(){
        const items = document.body.getElementsByTagName('*');

        listaJSON.map(l => {
            for (let i = 0; i < items.length; i++) {
                l.etiqueta = items.getElementsByTagName(items[i]);
                l.texto = items.children.textContent;
                if(document.getElementById(items[i])){
                   l.tieneId = true; 
                }
            }
        });
        return listaJSON;
    }

    console.log(obtenerEstructuraJSON());

    function imprimirEstructura(selector){

    }

    return {
        obtenerEstructuraJSON,
        imprimirEstructura
    };
})();


console.log(document.body.getElementsByTagName('*'));