
import {GerentContext} from '../context/Gerente/GerentContext';
import {useContext} from 'react'
import axios from "axios";
import { SubscribeClientPage } from '../pages/Admin';
const urlAddCLiente = 'http://localhost:3000/api/clientes';



const agregarCliente = async (body) => {
    const token = window.localStorage.getItem("token")
    console.log(token) 
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
    console.log(res)
    } catch (error) {
        console.error(error)
    }
}


export {
    agregarCliente
}