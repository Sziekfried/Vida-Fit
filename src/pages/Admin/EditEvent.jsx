import { useEffect, useState } from 'react'
import {Container, Row, Col, CardGroup, Button, Card} from 'react-bootstrap'
import { getEventos } from "../../controllers/getEventos";
import {Link} from 'react-router-dom'


/**
 * 
 * @returns componente de Ventana de edicion de Eventos
 *  */
function EditEvent() {
const token = window.localStorage.getItem("token")
let [eventos, setEventos] = useState(null)

useEffect(() => {
  getEventos().then(data=>{
    setEventos(data)
  })
},[])

/**
 * 
 * @returns Retorna en componente tipo Card Group con todos los eventos disponibles
 */
const TarjEvents = () => {
  if (eventos) {
    return (
      <CardGroup className="mt-2 justify-content-center">
        {eventos.map((evento, index) => {
          let urlEdit = `/edit-events/${evento._id}`
          let fecha = new Date(evento.date).toLocaleString()
          return (
            <Card key={index} >
              <Card.Img variant="top" src={evento.image} />
              <Card.Body>
                <Card.Title>{evento.title}</Card.Title>
                <Card.Subtitle>Fecha: {fecha.split(',')[0]}</Card.Subtitle>
                <Card.Text>
                  {evento.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button as={Link} to={urlEdit}>Editar</Button>
              </Card.Footer>
            </Card>
          );
        })}
      </CardGroup>
    );
  }else{
    return(
      <h4>Cargando eventos</h4>
    )
  }
};

  return (
    <Container>
      <Row>
        <Col>
        <h2 className='mt-2 mb-4'>Eventos Disponibles</h2>
          <TarjEvents />
        </Col>
      </Row>
    </Container>
  )
}

export default EditEvent