
const convertirFecha = (fecha) => {
    let fechaI = new Date(fecha);
    let mesXX = (fechaI.getMonth()<9) ? `0${fechaI.getMonth()+1}` : fechaI.getMonth()+1;
    let diaXX = (fechaI.getDate()<10) ? '0'+(fechaI.getDate()+1) : fechaI.getDate()+1
    return `${fechaI.getFullYear()}-${mesXX}-${diaXX}`
}

export {
    convertirFecha
}