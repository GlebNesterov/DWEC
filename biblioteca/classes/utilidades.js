export function esc(valor = '') {
    return String(valor)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}


export function opciones(items, getId, getTexto, seleccionado = null) {
    return items.map(i =>
        `<option value="${getId(i)}"${getId(i) === seleccionado ? ' selected' : ''}>${esc(getTexto(i))}</option>`
    ).join('');
}