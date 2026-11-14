'use strict';

const travel = (function () {
    
    function getDOMTree(bod = document.body) {
        
        const nodeText = Array.from(bod.childNodes)
                        .filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent.trim())
                        .filter(t => t !== '').join('');

        return {
            etiqueta: bod.tagName.toLowerCase(),
            id: bod.id,
            numHijos: bod.children.length,
            texto: nodeText,
            hijos: Array.from(bod.children).map(hijo => getDOMTree(hijo))
        };
    }

    function showPath(selector){
        let list = document.querySelector(selector);
        const res = [];

        if(!list) return [];

        while(list){
            const nodeText = Array.from(list.childNodes)
                        .filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent.trim())
                        .filter(t => t !== '').join('');

            res.unshift({
                etiqueta: list.tagName.toLowerCase(),
                id: list.id || 'noid',
                clases: Array.from(list.classList),
                texto: nodeText
            });
            list = list.parentElement;
        }
        return res;
    }

    return {
        getDOMTree,
        showPath
    };
})();

//console.log(travel.getDOMTree());

console.log(travel.showPath('div'));