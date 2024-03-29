import axios from "axios";


/**
 * 
 * @returns retorna un arreglo con las membresias en base de datos
 */
const getMembresias = async () => {
  let headersList = {
    "Content-Type": "application/json",
  };

  let reqOptions = {
    url: "http://localhost:3000/api/membresias",
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

export {
  getMembresias,
};
