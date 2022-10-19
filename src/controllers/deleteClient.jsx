import axios from "axios";
import swal from "sweetalert";


/**
 * 
 * @param {String} id Id del cliente a Eliminar
 * @param {*} token token del administrador sin el no se puede acceder al servidor
 * @returns 
 */
const deleteClient = async (id, token) => {
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "x-access-token": JSON.parse(token)
       }
       
       let reqOptions = {
         url: "http://localhost:3000/api/clientes/" + id,
         method: "DELETE",
         headers: headersList,
       }
       try {
           let response = await axios.request(reqOptions);
           swal('Borrado', JSON.stringify(response.data), "success")
           return response
       } catch (error) {
        swal('Error', JSON.stringify(error), "error")
        return error
       }

}
export default deleteClient

