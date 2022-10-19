import axios from "axios";
import swal from "sweetalert";


export const updateClient = async(body, token, id)=> {
const urlEdit = `http://localhost:3000/api/clientes/${id}`

let headersList = {
 "Accept": "*/*",
 "Content-Type": "application/json",
 "x-access-token": JSON.parse(token)
}

let reqOptions = {
  url: urlEdit,
  method: "put",
  headers: headersList,
  data: body
}

try {
    let response = await axios.request(reqOptions);
    swal("Cambios Guardados", JSON.stringify(response.data), "success")
    return response
} catch (error) {
    console.error(error)
    return error
}


}