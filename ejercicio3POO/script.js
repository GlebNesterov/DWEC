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

class Factura {
    constructor(clienteNIF, fecha, hora, pagada, lineas){
        this.clienteNIF = clienteNIF;
        this.fecha = fecha;
        this.hora = hora;
        this.pagada = pagada;
        this.lineas = lineas;
    }

    get importeTotal(){
        return 
    }

    get numeroArticulo(){
        return 
    }

    imprimirFactura(){
        return 
    }

    eliminarLinea(){

    }
}

class LineaFactura extends Factura{
    
}