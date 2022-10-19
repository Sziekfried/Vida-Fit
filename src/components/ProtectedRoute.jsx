import {Navigate, Outlet } from "react"
import {GerentContext} from '../context/Gerente/GerentContext';
import {useContext} from 'react'

function ProtectedRoute({children}) {
 const {id} = useContext(GerentContext)

 if(!id){
    return <Navigate to="/login" />
 }
 else{
    children ? children : <Outlet />
 }

}

export default ProtectedRoute