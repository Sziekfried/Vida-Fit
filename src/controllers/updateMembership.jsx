import axios from "axios";
import swal from "sweetalert";

/**
 * 
 * @param {[JSON]} body Json con la nueva informacion del evento
 * @param {String} id ID del evento a modificar
 * @param {TOKEN} token token del administrador 
 * @returns {response} retorna la respuesta del servidor
 */
export const updateMembership = async(body, id, token)=>{
let urlID = `http://localhost:3000/api/membresias/${id}`
    let headersList = {
        "Accept": "*/*",
        "x-access-token": JSON.parse(token),
        "Type-Content":"application/json"
    }
    
    let reqOptions = {
        url:urlID,
        method: "PUT",
        headers: headersList,
        data: JSON.parse(body),
    }
    try {
        let response = await axios.request(reqOptions);
        (response.status==201) ? swal("Hecho","Los datos se han actualizado", "success") : swal("Error", "algo salio mal", "error")
        return true;
    } catch (error) {
        console.error(error)
        return false;
    }

}
