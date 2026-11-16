'use strict';

const $traveler = (function () {
    function getElement(elm){
        return {
            etiqueta: elm.tagName.toLowerCase(),
            tieneClases: elm.classList.length > 0,
            identificador: elm.id,
            atributosData: {...elm.dataset},
            cantidadHijos: elm.children.length,
            hijos: Array.from(elm.children).map(getElement)
        };
    }

    function generateJSON(selector) {
        const elm = document.querySelector(selector);
        if(!elm){
            return null;
        }
        return JSON.stringify(getElement(elm));
    }
    
    function getChildrens(elm, lvl){
        const identificacion = ' '.repeat(lvl);
        const id = elm.id ? `#${elm.id}` : '';
        let lines = [`${identificacion}${elm.tagName.toLowerCase()}${id}`];

        Array.from(elm.children).forEach(hijo => {
            lines = lines.concat(getChildrens(hijo, lvl + 1));
        });
        
        return lines;
    }

    function generateTree(selector) {
        const elm = document.querySelector(selector);

        if (!elm) {
            return null;
        }

        return getChildrens(elm, 0).join('\n');
    }

    return {
        generateJSON,
        generateTree
    }
})();

console.log($traveler.generateJSON('div'));

console.log($traveler.generateTree('#cont'));