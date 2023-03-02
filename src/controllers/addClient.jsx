import { urlAPI } from './config';
import {GerentContext} from '../context/Gerente/GerentContext';
import {useContext} from 'react'
import axios from "axios";
import { SubscribeClientPage } from '../pages/Admin';
import swal from 'sweetalert';
const urlAddCLiente = 'http://localhost:3000/api/clientes';


/**
 * 
 * @param {*} body objeto JSON con los valores del cliente Nuevo
 * @returns  Respuesta del servidor si se logro guardar al cliente u ocurrio un error
 */
const agregarCliente = async (body) => {
    const token = window.localStorage.getItem("token")
    let header = {
        "Content-Type" :"application/json",
        "x-access-token": JSON.parse(token),
    }
    let options = {
        url: urlAddCLiente,
        method: "POST",
        headers: header,
        data: body
    }
    try {
        const res = await axios.request(options);
        swal("Hecho","Se ha guardado el ususario", 'success')
        return res
    } catch (error) {
        swal('Error',JSON.stringify(error.response.data),'error')
        return error
    }
}


export {
    agregarCliente
}