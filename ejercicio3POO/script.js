/*
Campos:
• “clienteNIF”.
• “fecha”, fecha sin la hora.
• “hora”, fecha sólo con la hora y minutos.
• “pagada”, booleano.
• “líneas” (lista), colección de detalles de la factura.
Propiedades:
• “importeTotal” (get), devuelve el importe agregado de las líneas de factura.
• “numeroArticulos” (get), devuelve el número de líneas de factura.
Métodos:
• “imprimirFactura()”, devuelve una cadena formateada con la información de la
factura, cabecera con los datos básicos y la lista con las líneas de la factura.
• “agregarLinea(concepto, cantidad, precio)”, añade una nueva línea al final de
“líneas”.
• “eliminarLínea()”, elimina la última línea de “líneas”.
La estructura “Línea” de factura se compone de:
Campos:
• “concepto”
• “cantidad”, entero.
• “precioUnitario”, real.
*/

'use strict';

const $ = (id) => document.getElementById(id);

class Factura {
    constructor(clienteNIF, fecha, hora, pagada, lineas){
        this.clienteNIF = clienteNIF;
        this.fecha = fecha;
        this.hora = hora;
        this.pagada = pagada;
        this.lineas = lineas;
    }

    get importeTotal(){
        let total = 0;
        for (let i = 0; i < this.lineas.length; i++) {
            total += this.lineas[i].cantidad * this.lineas[i].precio;
        }

        return total;
    }

    get numeroArticulos(){
        return this.lineas.length;
    }

    imprimirFactura(){
        let texto = 'FACTURA \n';
        texto += '-------------------------\n';
        texto += 'NIF de cliente: ' + this.clienteNIF + '\n';
        texto += 'Fecha: ' + this.fecha + '\n';
        texto += 'Hora: ' + this.hora + '\n';
        texto += 'Pagada: ' + this.pagada + '\n';
        texto += '-------------------------\n';
        texto += "LÍNEAS DE FACTURA:\n";

        for (let i = 0; i < this.lineas.length; i++) {
            texto += "Concepto: " + this.lineas[i].concepto + "\n";
            texto += "Cantidad: " + this.lineas[i].cantidad + "\n";
            texto += "Precio: " + this.lineas[i].precio + " €\n";
            texto += "Subtotal: " +
                (this.lineas[i].cantidad * this.lineas[i].precio) +
                " $\n";
            texto += "------------------------\n";
        }

        texto += "Número de líneas: " + this.numeroArticulos + "\n";
        texto += "Importe total: " + this.importeTotal + " €\n";

        return texto;
    }

    agregarLinea(concepto, cantidad, precio){
        return this.lineas.push({
            concepto,
            cantidad,
            precio
        });
    }

    eliminarLinea(){
        return this.lineas.pop();
    }
}

function crearFactura(){
    return new Factura(
        $('nif').value.trim(),
        $('fecha').value,
        $('hora').value,
        $('pagada').checked,
        factura1.lineas.map((linea) => ({ ...linea }))
    );
}

class Utilidades{
    static serializarFactura(factura){
        return JSON.stringify(factura);
    }

    static deserializarFactura(facturaJSON){
        let datos = JSON.parse(facturaJSON);

        if (
            !datos ||
            typeof datos.clienteNIF !== 'string' ||
            typeof datos.fecha !== 'string' ||
            typeof datos.hora !== 'string' ||
            typeof datos.pagada !== 'boolean' ||
            !Array.isArray(datos.lineas) ||
            !datos.lineas.every((linea) =>
                linea &&
                typeof linea.concepto === 'string' &&
                Number.isInteger(linea.cantidad) &&
                linea.cantidad >= 1 &&
                Number.isFinite(linea.precio) &&
                linea.precio >= 0
            )
        ) {
            throw new Error('El JSON no tiene el formato de una factura.');
        }

        return new Factura(
            datos.clienteNIF,
            datos.fecha,
            datos.hora,
            datos.pagada,
            datos.lineas
        );
    }
}

let factura1 = new Factura('', '', '', false, []);

$('actualizar').addEventListener('click', () => {
    factura1 = crearFactura();

    $('impresionFactura').textContent = factura1.imprimirFactura();
});

$('agregarLinea').addEventListener('click', () => {
    const concepto = $('concepto').value.trim();
    const cantidad = Number($('cantidad').value);
    const precio = Number($('precio').value);

    if (
        !concepto ||
        !Number.isInteger(cantidad) ||
        cantidad < 1 ||
        !Number.isFinite(precio) ||
        precio < 0
    ) {
        $('impresionFactura').textContent = 'Introduce un concepto, una cantidad entera mayor que cero y un precio válido.';
        return;
    }

    factura1 = crearFactura();
    factura1.agregarLinea(concepto, cantidad, precio);
    $('impresionFactura').textContent = factura1.imprimirFactura();
    $('concepto').value = '';
    $('cantidad').value = '';
    $('precio').value = '';
});

$('EliminarLinea').addEventListener('click', () => {
    factura1 = crearFactura();
    factura1.eliminarLinea();
    $('impresionFactura').textContent = factura1.imprimirFactura();
});

$('serializar').addEventListener('click', () => {
    factura1 = crearFactura();
    $('salida').value = Utilidades.serializarFactura(factura1);
});

$('deserializar').addEventListener('click', () => {
    try {
        factura1 = Utilidades.deserializarFactura($('entrada').value);
        $('nif').value = factura1.clienteNIF;
        $('fecha').value = factura1.fecha;
        $('hora').value = factura1.hora;
        $('pagada').checked = factura1.pagada;
        $('impresionFactura').textContent = factura1.imprimirFactura();
    } catch (error) {
        $('impresionFactura').textContent = `Error al deserializar: ${error.message}`;
    }
});
