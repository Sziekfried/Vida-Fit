import axios from "axios";
import swal from "sweetalert";


export const updateEvent = async(body, id, token)=>{
let urlID = `http://localhost:3000/api/eventos/${id}`
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
