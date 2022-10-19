import { useEffect, useState } from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import { getMembresias } from '../../controllers/getMembresias'
import {Link} from 'react-router-dom'

function MembershipPage() {
//confuguracion inicial para renderizar el componente
let [membresias, setMembresias] = useState(null);
useEffect(()=>{
  getMembresias().then((data) => {
    setMembresias(data);
  })
},[])




  if(!membresias) return <p>Cargando...</p>
  return (
    <Container>
      <Row>
        <Col className="mx-auto mt-2">
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 p-1">
            {
              membresias.map((item, index)=>{
              let dirEdit = `/edit-membresias/${item._id}`;
                return (
                <Col key={index}>
                  <Card>
                    <Card.Img style={{width:100}} className="mx-auto mt-2" variant="top" src={item.image}/>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle>{item.Level}</Card.Subtitle>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>Precio: ${item.price} USD</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <strong>Dias de membresia: {item.duration}</strong>
                  </Card.Footer>
                  <Button variant="outline-primary" as={Link} to={dirEdit}>Editar Membresia</Button>
                  </Card>
                </Col>
                )
            })
            }
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MembershipPage