'use strict';

/*
    • Función “agregarProducto(nombre, cantidad, precio, categoría)” que añada el
    producto si no existe. Si el producto ya existe muestra un alert indicando que el
    producto ya existe.

    • Función “eliminarProducto(nombre)” que elimina el producto del inventario. Si el
    producto no existe muestra un alert indicando que producto no existe.

    • Función “buscarProducto(nombre)” que devuelve el objeto con la información
    del producto.

    • Función “actualizarInventario(nombre, cantidad)” incrementa o decrementa el
    stock según la cantidad indicada. Si la reducción deja el stock a 0 se mostrará un
    alert solicitando la reposición.

    • Función “ordenarProductosPorPrecio()” devuelve una lista ordenada de forma
    ascendente. El resultado es un nuevo array, cuidado que no tienes el nombre.

    • Función “imprimirInventario()” devuelve una lista con el informe de inventario, el
    cual muestra el “nombre”, “categoría”, “cantidad”, “precio” y “total”
    (cantidad*precio).

    • Función “filtrarProductosPorCategoria(categoría)” devuelve una lista con los
    productos de una categoría. Muestra el “nombre”, “cantidad”, “precio”.


    Emplea los métodos de array siempre que puedas.
    Envuelve el código en una función autoinvocada y asígnala a la constante $negocio. Esta
    función sólo devuelve colecciones con datos formateados y genera mensajes de alerta.
    La asociación entre los controles html y código JavaScript se hará en el evento “load”
    fuera de $negocio.
    El formato de los datos y presentación es independiente de $negocio.
*/



const $negocio = (function (){
    let productos = {
        platano : {cantidad : 3, precio : 0.5, categoria : 'comida'},
        teclado : {cantidad : 1, precio : 75, categoria : 'accesorio'},
        raton : {cantidad : 1, precio : 65, categoria: 'accesorio'},
        tomate : {cantidad : 4, precio : 0.65, categoria: 'comida'}
    }


    // agregar producto
    function agregarProducto(nombre, cantidad, precio, categoria){

        if(nombre in productos){
            alert(`El producto ${nombre} ya existe`);
            return;
        }
        productos[nombre] = {cantidad, precio, categoria};
    }

    // elimino el producto e imprimo la tabla otra vez, para que se actualice
    function eliminarProducto(nombre){        
        if(!(nombre in productos)){
            alert('El producto no existe');
            return;
        }
        delete productos[nombre];
    }

    function buscarProducto(nombre) {
        if(!(nombre in productos)){
            alert('El producto no existe');
            return;
        }
        
        return {nombre, ...productos[nombre]};
    }

    function actualizarInventario(nombre, cantidad){
        if(!(nombre in productos)){
            alert('El producto no existe');
            return;
        }

        const nuevoStock = productos[nombre].cantidad + cantidad;

        if(nuevoStock < 0){
            alert('No hay stock suficiente');
            return;
        }

        productos[nombre].cantidad = nuevoStock;

        if (nuevoStock === 0) {
            alert(`El stock de ${nombre} es 0`);
        }
    }

    function filtrarProductoPorCategoria(categoria) {
        return imprimirInventario().filter(p => p.categoria.toLowerCase() === categoria.toLowerCase())
                .map(p => ({nombre: p.nombre, cantidad: p.cantidad, precio : p.precio, categoria : p.categoria}));
    }

    function imprimirInventario(){
        const lista = [];

        for(let nombre in productos){
            const p = productos[nombre];

            lista.push({
                nombre,
                categoria : p.categoria,
                cantidad : p.cantidad,
                precio : p.precio,
                total : p.cantidad * p.precio
            });  
        }
        return lista;
    }

    function ordenarProductoPorPrecio(){
        return imprimirInventario().sort((a, b) => a.precio - b.precio);
    }

    return {
        agregarProducto,
        eliminarProducto,
        buscarProducto,
        actualizarInventario,
        ordenarProductoPorPrecio,
        imprimirInventario,
        filtrarProductoPorCategoria
    };

})();


function pintarTabla(lista){
    const zona = document.getElementById('resultados');

    if(lista.length === 0){
        zona.innerHTML = '<p>Sin Resultado</p>';
        return;
    }

    let cabecera = '';
    for (let campo in lista[0]) {
        cabecera += `<th>${campo}</th>`;
    }

    const filas = lista.map(p =>{
        let celdas = '';
        
        for (const campo in p) {
            celdas += `<td>${p[campo]}</td>`;
        }
        return `<tr>${celdas}</tr>`;
    }).join('');

    zona.innerHTML = `<table><thead><tr>${cabecera}</tr></thead><tbody>${filas}</tbody></table>`;
}

window.addEventListener('load', () => {
    const valor = id => document.getElementById(id).value;
    const refrescar = () => pintarTabla($negocio.imprimirInventario());

    refrescar();

    document.getElementById('inventario').addEventListener('click', refrescar);

    document.getElementById('ordenarAsc').addEventListener('click', () => {
        pintarTabla($negocio.ordenarProductoPorPrecio());
    });

    document.getElementById('ordenarDesc').addEventListener('click', () => {
        pintarTabla($negocio.ordenarProductoPorPrecio().reverse());
    });

    document.getElementById('agregar').addEventListener('click', () => {
        $negocio.agregarProducto(
            valor('nombreA'),
            Number(valor('cantidad')),
            Number(valor('precio')),
            valor('categoria')
        );
        refrescar();
    });

    document.getElementById('eliminar').addEventListener('click', () =>{
        const nombre = valor('nombreE');

        if(confirm(`Eliminar "${nombre}" ?`)){
            $negocio.eliminarProducto(nombre);
            refrescar();
        }
    });

    document.getElementById('buscar').addEventListener('click', () => {
        const p = $negocio.buscarProducto(valor('nombreB'));
        pintarTabla(p ? [p] : []);
    });

    document.getElementById('actualizar').addEventListener('click', () => {
        $negocio.actualizarInventario(valor('nombreAct').trim(), Number(valor('cantidadAct')));
        refrescar();
    });

    document.getElementById('aceptar').addEventListener('click', () => {
        pintarTabla($negocio.filtrarProductoPorCategoria(valor('categoriaOrd')));
    });
});
