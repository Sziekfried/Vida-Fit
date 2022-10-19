import { useReducer, useContext } from "react";
import GerentReducer from "./GerentReducer";
import { GerentContext } from "./GerentContext";
import axios from "axios";
import swal from "sweetalert";

const getLocalStorage = () => {
  let id = window.localStorage.getItem("id")
  let token = window.localStorage.getItem("token")
  if (!id || !token){
    id = null;
    token = null;
    return {id, token}
  }
  return {id, token}
}

function GerentState(props) {
  let {id, token} = getLocalStorage()
  const initialState = {
    id,
    token,
  };
  const [state, dispatch] = useReducer(GerentReducer, initialState);

  const setLocalStorage = (id, token) => {
    try {
      window.localStorage.setItem("id", JSON.stringify(id))
      window.localStorage.setItem("token", JSON.stringify(token))
    } catch (error) {
      console.error(error)
    }
  }

  const loginGerente = async (body) => {
    let headersList = {
      "Content-Type": "application/json",
    };
    let bodyContent = body;

    let reqOptions = {
      url: "http://localhost:3000/api/login",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    try {
      let response = await axios.request(reqOptions);
      //Guardar en LocalStorage y En el contexto global
      setLocalStorage(response.data.id, response.data.token)
      dispatch({
        type: "TOKEN_GERENTE",
        payload: response.data.token,
      });
      dispatch({
        type: "ID_GERENTE",
        payload: response.data.id,
      });
    } catch (error) {
      let msj = error.response.data;
      swal("Error", msj, "error");
      console.error(error);
    }
  };

  return (
    <GerentContext.Provider
      value={{ id: state.id, token: state.token, loginGerente }}
    >
      {props.children}
    </GerentContext.Provider>
  );
}

export default GerentState;
