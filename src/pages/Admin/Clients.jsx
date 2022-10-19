import { useEffect, useState } from 'react'
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import deleteClient from '../../controllers/deleteClient'
import { getClientes } from '../../controllers/getClientes'


/**
 * 
 * @returns Retorna un componente Con todos los clientes
 */
function Clients() {
  const [clientes, setClientes] = useState(null)
  useEffect(()=>{
    const token = window.localStorage.getItem("token")
    getClientes(token).then(data=>{
      setClientes(data)
    })
  },[])

  /**
   * @void funcion que elimina al cliente
   * @param {String} id id del cliente a eliminar
   */
  const deleteButton = async(id)=>{
    const token = window.localStorage.getItem("token")
    let respuesta = await swal({
      title: "Estas Seguro de eliminar este registro?",
      text: "Una vez eliminado no se puede recuperar",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    if(respuesta){
      let res = await deleteClient(id, token)
      location.reload()
    }else{
      swal("No se borro nada");
    }

  }

  if(!clientes){
    return(
      <Container>
        <Row>
          <Col className="text-center">
            <h2>Cargando</h2>
          </Col>
        </Row>
      </Container>
    )
  }else return (
    <Container>
      <Row>
        <Col className="mt-3 text-center">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE COMPLETO</th>
                <th>RFC</th>
                <th>TELEFONO</th>
                <th>NIVEL MEMBRESIA</th>
                <th>FIN MEMBRESIA</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((item, index)=>{
                let date = new Date(item.endOfSubscription)
                let dirEdit = `/edit-client/${item.rfc}`
                return(
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name} {item.lastname} </td>
                    <td>{item.rfc.toUpperCase()}</td>
                    <td>{item.phone}</td>
                    <td>{item.subscription}</td>
                    <td>{date.toLocaleString().split(',')[0]}</td>
                    <td><Button onClick={(ev)=>{

                    }}   className='mx-2' variant="warning" as={Link} to={dirEdit}><i className="bi bi-pencil-square"></i></Button>
                    <Button variant="danger" onClick={(ev)=>{
                      deleteButton(item._id)
                    }}><i className="bi bi-person-x"></i></Button></td>
                  </tr>
                )
              })
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default Clients