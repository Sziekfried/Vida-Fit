import axios from "axios";
import swal from "sweetalert";


/**
 * 
 * @param {string} id id del evento para retornar todo el registro del objeto 
 * @returns {evento} retorna un evento
 */
const getMembershipById = async (id) => {
   let urlId=`http://localhost:3000/api/membresias/${id}`
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let reqOptions = {
    url: urlId,
    method: "GET",
    headers: headersList,
  };

  try {
    let response = await axios.request(reqOptions);
    return response.data;
  } catch (error) {
    console.error(error)
  }
  
};

export default getMembershipById;
