import {GerentContext} from '../context/Gerente/GerentContext';
import {useContext} from 'react'
import AppRouterAdmi from "../routers/AppRouterAdmi";
import AppRouterPublic from "../routers/AppRouterPublic";
import NavGerente from "./NavGerente";
import Navigation from "./Navigation";

//Con este componente se elige si ya se inicio sesion se cambia de enrutador y de navegacion.

function Initial() {
const {id} = useContext(GerentContext)
if(id){
 return (
        <>
            <NavGerente/>
            <AppRouterAdmi />
        </>
    )
  }else{
    return (
        <>
            <Navigation />
            <AppRouterPublic />
        </>
    )
  }
}

export default Initial