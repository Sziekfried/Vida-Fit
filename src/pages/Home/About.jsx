import {Container, Col, Row, Card} from 'react-bootstrap'

function About() {
  return (
    <Container className="mt-3">
      <Row md={8} className="text-center">
        <Col>
          <Card>
            <Card.Body>
            <Card.Title>Mision</Card.Title>
            <Card.Subtitle> Lorem ipsum dolor sit amet. </Card.Subtitle>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quas maxime, quis vero ratione pariatur autem sit facere qui dolor.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
        <Card>
            <Card.Body>
            <Card.Title>Valores</Card.Title>
            <Card.Subtitle>Club Deportivo</Card.Subtitle>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium quis incidunt assumenda facilis deleniti praesentium velit commodi cumque, placeat ipsum! Tempore possimus, harum expedita natus dolor sint cum incidunt recusandae.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
        <Card>
            <Card.Body>
            <Card.Title>Vision</Card.Title>
            <Card.Subtitle> Lorem ipsum dolor sit amet. </Card.Subtitle>
              <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quia eos distinctio. Laboriosam reiciendis expedita odio laudantium accusantium alias possimus nam dolor. Aperiam, facere rem.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default About