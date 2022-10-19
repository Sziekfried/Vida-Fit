import { Container, Row, Col, Card, CardGroup, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
function Home() {


  return (
    <Container className="text-center">
      <Row className="mt-4">
        <CardGroup>
          <Card>
            <Card.Img variant="top" src="https://res.cloudinary.com/dm7yqyoql/image/upload/v1666117414/nlpue6wtt1pxdtn5f7kb.png" />
            <Card.Body>
              <Card.Title>Clientes</Card.Title>
              <Card.Text>
                Seccion para ver a todos los clientes que se tienen registrados
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button className="mx-1" variant="success" as={Link} to="/clientes">Ver Clientes</Button>
              <Button variant="success" as={Link} to="/visita-cliente">Registrar Visita</Button>
            </Card.Footer>
          </Card>
          <Card >
            <Card.Img variant="top" src="https://res.cloudinary.com/dm7yqyoql/image/upload/v1666117414/nyqvcevbzopafmt9lil3.png" />
            <Card.Body>
              <Card.Title>Agregar Cliente</Card.Title>
              <Card.Text>
                Suscribir a nuevo miembro del club deportivo Vida-Fit
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" as={Link} to="/new-client">Suscribir a Cliente</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="https://res.cloudinary.com/dm7yqyoql/image/upload/v1666117414/adimctv7la25sadmyzxn.png" />
            <Card.Body>
              <Card.Title>Administrar Eventos</Card.Title>
              <Card.Text>
                Administrar los eventos del club, mismos que se mostraran en la pagina principal dirigida al publico
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="info" as={Link} to="/edit-events">Eventos</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="https://res.cloudinary.com/dm7yqyoql/image/upload/v1666117448/al1u8zhv6wbuddlql9vf.png" />
            <Card.Body>
              <Card.Title>Administar Membresias</Card.Title>
              <Card.Text>
                Cambiar costos, duracion, descripcion de las membresias disponibles en el club asi como eliminar alguna o agregar otra etc.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="info" as={Link} to="/edit-membresias">Membresias</Button>
            </Card.Footer>
          </Card>
        </CardGroup>
      </Row>
    </Container>
  );
}

export default Home;
