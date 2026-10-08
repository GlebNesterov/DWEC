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

 

const agregar = document.getElementById('agregar');
const eliminar = document.getElementById('eliminar');
const buscar = document.getElementById('buscar');
const actualizar = document.getElementById('actualizar');
const ordenarAsc = document.getElementById('ordenarAsc');
const ordenarDesc = document.getElementById('ordenarDesc');
const aceptar = document.getElementById('aceptar');


const $negocio = (function (){

    let ordenActual = null;
    let categoriaActual = '';

    let productos = {
        platano : {cantidad : 3, precio : 0.5, categoria : 'comida'},
        teclado : {cantidad : 1, precio : 75, categoria : 'accesorio'},
        raton : {cantidad : 1, precio : 65, categoria: 'accesorio'},
        tomate : {cantidad : 4, precio : 0.65, categoria: 'comida'}
    }

    // agregar producto
    function agregarProducto(nombre, cantidad, precio, categoria){
        let mensajeAg = document.getElementById('mensajeAg');

        if(nombre in productos){
            mensajeAg.textContent = `Producto ${nombre} ya existe`
            return false;
        }
        productos[nombre] = {cantidad, precio, categoria};
        mensajeAg.textContent = `Producto ${nombre} agregado`
        return true;

    }

    // elimino el producto e imprimo la tabla otra vez, para que se actualice
    function eliminarProducto(nombre){
        let mensajeElim = document.getElementById('mensajeElim');
            
        if(nombre in productos){
            delete productos[nombre];
            mensajeElim.textContent = 'Producto eliminado correctamente';
            return;
        }
        mensajeElim.textContent = 'No se ha podido eliminar el producto';
    }

    function buscarProducto(nombre) {
        let mensajeBu = document.getElementById('mensajeBu');
        if(nombre in productos){
            let producto = productos[nombre];
            mensajeBu.textContent = `Producto: ${nombre}, cantidad: ${producto.cantidad}, precio: ${producto.precio}, categoria: ${producto.categoria}`;
        }else{
            mensajeBu.textContent = `No se ha encontrado el producto ${nombre}`;
        } 
    }

    function actualizarInventario(nombre, cantidad){
        let actualizando = document.getElementById('actualizando');

        if(!(nombre in productos)){
            actualizando.textContent = `No se ha encotrado el producto ${nombre}`;
            return;
        }
        if(!(cantidad > 0)){
            alert('La cantidad no puede ser 0 o menor');
            return;
        }
        productos[nombre].cantidad = cantidad;
        actualizando.textContent = `Cantidad de ${nombre} actualizada a ${cantidad}`;
    }

    // imprimir la tabla 
    function imprimirInventario(){
        let filas = document.getElementById('filas');
        let lista = [];
        let html = '';

        for (let nombre in productos) {
            let producto = productos[nombre];

            if(categoriaActual === '' || producto.categoria.toLowerCase() === categoriaActual){
                lista.push({nombre, ...producto});
            }
        }

        if(ordenActual === 'asc'){
            lista.sort((a, b) => a.precio - b.precio);
        }else if(ordenActual ==='desc'){
            lista.sort((a,b) => b.precio - a.precio);
        }

        if(lista.length === 0){
            filas.innerHTML = '<div class="fila"><div>Sin resultado</div></div>';
            return;
        }
    
        for (let p of lista) {
            html += `
            <div class="fila">
                <div>${p.nombre}</div>
                <div>${p.cantidad}</div>
                <div>${p.precio}</div>
                <div>${p.categoria}</div>
            </div>
            `;
        }
        filas.innerHTML = html;
    }

    return {
        agregarProducto(nombre, cantidad, precio, categoria)
        eliminarProducto(nombre),
        buscarProducto(nombre),
        actualizarInventario(nombre, cantidad),
        imprimirInventario()
    };

});




// botones

/*

ordenarDesc.onclick = function(){
    ordenActual = 'desc';
    imprimirInventario();
}

ordenarAsc.onclick = function(){
    ordenActual = 'asc';
    imprimirInventario();
}


agregar.onclick = function(){
    let nombre = document.getElementById('nombreA').value.trim().toLowerCase();
    let cantidad = Number(document.getElementById('cantidad').value);
    let precio = Number(document.getElementById('precio').value);
    let categoria = document.getElementById('categoria').value.trim().toLowerCase();

    if(nombre === '' || categoria === '' || !(cantidad > 0) || !(precio >= 0)){
        alert('Revisa los campos: nombre, cantidad, precio');
        return;
    }

    agregarProducto(nombre, cantidad, precio, categoria);
    imprimirInventario();
}

eliminar.onclick = function(){
    let nombre = document.getElementById('nombreE').value.trim().toLowerCase();
    eliminarProducto(nombre);
    imprimirInventario();
}

buscar.onclick = function(){
    let nombre = document.getElementById('nombreB').value.trim().toLowerCase();
    buscarProducto(nombre);
}

actualizar.onclick = function(){
    let nombre = document.getElementById('nombreAct').value.trim().toLowerCase();
    let cantidad = Number(document.getElementById('cantidadAct').value);

    actualizarInventario(nombre, cantidad);

    imprimirInventario();
}

aceptar.onclick = function(){
    categoriaActual = document.getElementById('categoriaOrd').value.trim().toLowerCase();
    imprimirInventario();
}
*/