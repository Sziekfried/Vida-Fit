import { Container, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getMembresias } from "../../controllers/getMembresias";
function MembCards() {
  let [membresias, setMembresias] = useState(null);
  useEffect(() => {
    getMembresias().then((data) => {
      setMembresias(data);
    });
  }, []);
  if (!membresias) {
    return (
      <Container>
        <Row>
          <Col>
            <h2>Cargando...</h2>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container className="mt-5 align-content-center">
        <Row>
          {membresias.map((item, index) => {
            return (
              <Col key={index} className="text-center mt-5">
                <Card className="pb-3 pt-3">
                  <Card.Img varian="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.Level}</Card.Text>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>{item.duration} dias de suscripcion</Card.Text>
                    <Card.Text>${item.price} USD</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default MembCards;
