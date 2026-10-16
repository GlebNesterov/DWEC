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

    get numeroArticulo(){
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
                " €\n";
            texto += "------------------------\n";
        }

        texto += "Número de líneas: " + this.numeroArticulos + "\n";
        texto += "Importe total: " + this.importeTotal + " €\n";

        return texto;
    }

    agregarLinea(){
        return this.lineas.push({
            concepto: this.lineas.concepto,
            cantidad: this.lineas.cantidad,
            precio: this.lineas.preio
        });
    }

    eliminarLinea(){
        return this.lineas.pop({
            concepto: this.lineas.concepto,
            cantidad: this.lineas.cantidad,
            precio: this.lineas.precio
        });
    }
}

class Utilidades{
    constructor(){

    }
}

function crearFactura(){
    let clienteNIF = $('nif');
    let fecha = $('fecha');
    let hora = $('hora');
    let pagada = $('pagada');
    let concepto = $('concepto');
    let cantidad = $('cantidad');
    let precio = $('precio');

    let lineas = [
        {
            concepto: concepto,
            cantidad: cantidad,
            precio: precio
        }
    ];
}
