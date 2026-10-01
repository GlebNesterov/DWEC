
function agrupaXTipo(cosas) {
    let res = {};
    let pos = 0;
    for (let cosa of cosas) {
        let tipo = typeof(cosa);
        if(!tipo in res){
            cosas[tipo] = [];
        }
        let ultimo = res[tipo].length;
        res[tipo][ultimo] = {Object: cosa, pos};
        
    }

    for (let llave of cosas) {
        console.log(res[llave]);
    }
}