import axios from "axios";

/**
 * 
 * @param {*} token Token de acceso para obtener a los clientes
 * @returns {Array} retorna un array con los clientes en la base de datos
 */
const getClientes = async (token) => {
  let headersList = {
    "Content-Type": "application/json",
    "x-access-token": JSON.parse(token)
  };

  let reqOptions = {
    url: "http://localhost:3000/api/clientes?size=1000&page=0",
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data.docs;
};

export {
  getClientes,
};
