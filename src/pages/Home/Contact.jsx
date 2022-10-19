import {Container, Row, Col} from 'react-bootstrap'
function Contact() {
  return (
    <Container>
      <Row>
        <Col className="text-md-center contactosz">
        
          <h2>Contacto</h2>
          <h4>Telefono: <span>XXX-XXX-XXXX</span></h4>
          <h4>Direccion: <span>Calle sin nombre, sin numero CP: xxxxx</span></h4>
          <h4>Email: <span>algo@algo.com</span></h4>

        </Col>
      </Row>
    </Container>
  )
}

export default Contact