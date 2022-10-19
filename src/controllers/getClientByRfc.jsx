import axios from "axios";
import swal from "sweetalert";


/**
 * 
 * @param {string} body RFC del cliente a buscar
 * @param {string} token token del administrador esta almacenado en el local storage 
 * @returns {object} retorna un registro encontrado
 */
const getClientByRfc = async(body, token) => {
let headersList = {
 "Content-Type": "application/json",
 "x-access-token": JSON.parse(token),
 "Accept": "*/*" 
}

const rfc = (typeof(body)==='string') ? body.toUpperCase(): body.rfc.toUpperCase()
let bodyContent = JSON.stringify({
  "rfc": rfc
});

let reqOptions = {
  url: "http://localhost:3000/api/clientes/rfc",
  method: "POST",
  headers: headersList,
  data: bodyContent,
}
    try {
        let res = await axios.request(reqOptions);
        if((typeof(body)!=='string')){
        swal("Encontrado", JSON.stringify(res.data.name) ,'success')
        }
        return res.data
    } catch (error) {
        swal("Error", JSON.stringify(error.response.data),'error')
        return error.data
    }
}

export default getClientByRfc
