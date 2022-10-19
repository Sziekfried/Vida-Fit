import axios from "axios";

const getEventos = async () => {
  let headersList = {
    "Content-Type": "application/json",
  };

  let reqOptions = {
    url: "http://localhost:3000/api/eventos",
    method: "GET",
    headers: headersList,
  };

  let response = await axios.request(reqOptions);
  return response.data;
};

export {
  getEventos,
};
