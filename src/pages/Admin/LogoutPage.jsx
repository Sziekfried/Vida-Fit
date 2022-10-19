import { useReducer, useContext, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import GerentReducer from "../../context/Gerente/GerentReducer";

function LogoutPage() {
  let [salio, setSalio] = useState(false);
  if (salio) {
    return (
      <Container>
        <span>
          Da click <a href="/">aqui</a> si no eres redireccionado
          automaticamente{" "}
        </span>
      </Container>
    );
  }
  return (
    <Container>
      <Row className="w-100">
        <Col className="text-center ">
          <Card className='p-5 mx-auto mt-3' style={{ width: "18rem" }}>
            <Card.Img variant="top" src="https://res.cloudinary.com/dm7yqyoql/image/upload/v1666132444/ghiwuhqajwjcrsnkdjub.png" />
            <Card.Body>
              <Card.Title>Gracias Por Tu Trabajo</Card.Title>
              <Card.Text>
                La sesion se cerrara, y seras redireccionado a la pagina publica.
              </Card.Text>
              <Button
                type="submit"
                variant="danger"
                onClick={(ev) => {
                  window.localStorage.clear();
                  setSalio(true);
                }}
              >
                {" "}
                Salir{" "}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LogoutPage;
