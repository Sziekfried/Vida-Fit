import axios from "axios";
import swal from "sweetalert";

const getEventtById = async (id) => {
   let urlId=`http://localhost:3000/api/eventos/${id}`
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

export default getEventtById;
